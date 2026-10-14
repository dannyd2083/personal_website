import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import { anonClient, serviceClient, createUserClient, deleteUser } from './supabase-local.js'
import { FIXTURE, seedFixtures, cleanupFixtures, makeAdmin } from './fixtures.js'

const db = serviceClient()
const anon = anonClient()
let admin, stranger

async function altOf(id) {
    const { data } = await db.from('photos').select('alt').eq('id', id).maybeSingle()
    return data?.alt
}

beforeAll(async () => {
    const stamp = Date.now()
    admin = await createUserClient(`admin-${stamp}@test.local`)
    stranger = await createUserClient(`stranger-${stamp}@test.local`)
    await makeAdmin(admin.userId)
})

afterAll(async () => {
    await cleanupFixtures(db)
    await deleteUser(admin.userId)
    await deleteUser(stranger.userId)
})

beforeEach(async () => {
    await cleanupFixtures(db)
    await seedFixtures(db)
})

describe('anonymous visitor', () => {
    it('sees published photos but not pending ones', async () => {
        const { data, error } = await anon.from('photos').select('id').eq('visit_id', FIXTURE.visitId)
        expect(error).toBeNull()
        const ids = data.map(p => p.id)
        expect(ids).toContain(FIXTURE.publishedId)
        expect(ids).not.toContain(FIXTURE.pendingId)
    })

    it('can still read places and visits', async () => {
        const places = await anon.from('places').select('id').eq('id', FIXTURE.placeId)
        const visits = await anon.from('visits').select('id').eq('id', FIXTURE.visitId)
        expect(places.data).toHaveLength(1)
        expect(visits.data).toHaveLength(1)
    })

    it('cannot insert a photo', async () => {
        const { error } = await anon.from('photos')
            .insert({ id: 'anon-insert', visit_id: FIXTURE.visitId, url: 'https://example.com/x.jpg' })
        expect(error).not.toBeNull()
    })

    it('has no write permission at all, even before RLS is checked', async () => {
        const { error } = await anon.from('photos')
            .insert({ id: 'anon-insert-2', visit_id: FIXTURE.visitId, url: 'https://example.com/y.jpg' })
        expect(error.message).toContain('permission denied')
    })

    it('cannot change a photo', async () => {
        await anon.from('photos').update({ alt: 'hacked' }).eq('id', FIXTURE.publishedId)
        expect(await altOf(FIXTURE.publishedId)).toBe('original')
    })

    it('cannot delete a photo', async () => {
        await anon.from('photos').delete().eq('id', FIXTURE.publishedId)
        expect(await altOf(FIXTURE.publishedId)).toBe('original')
    })

    it('cannot read the admin list', async () => {
        const { data } = await anon.from('admin_users').select('user_id')
        expect(data ?? []).toHaveLength(0)
    })
})

describe('logged-in user who is not the admin', () => {
    it('is not admin', async () => {
        const { data } = await stranger.client.rpc('is_admin')
        expect(data).toBe(false)
    })

    it('cannot see pending photos', async () => {
        const { data } = await stranger.client.from('photos').select('id').eq('id', FIXTURE.pendingId)
        expect(data ?? []).toHaveLength(0)
    })

    it('cannot insert a photo', async () => {
        const { error } = await stranger.client.from('photos')
            .insert({ id: 'stranger-insert', visit_id: FIXTURE.visitId, url: 'https://example.com/x.jpg' })
        expect(error).not.toBeNull()
    })

    it('cannot change or delete a photo', async () => {
        await stranger.client.from('photos').update({ alt: 'hacked' }).eq('id', FIXTURE.publishedId)
        await stranger.client.from('photos').delete().eq('id', FIXTURE.pendingId)
        expect(await altOf(FIXTURE.publishedId)).toBe('original')
        expect(await altOf(FIXTURE.pendingId)).toBe('original')
    })
})

describe('admin', () => {
    it('is admin', async () => {
        const { data } = await admin.client.rpc('is_admin')
        expect(data).toBe(true)
    })

    it('sees pending photos', async () => {
        const { data } = await admin.client.from('photos').select('id').eq('id', FIXTURE.pendingId)
        expect(data).toHaveLength(1)
    })

    it('can create a place, visit, and photo, recorded as created by the admin', async () => {
        const place = await admin.client.from('places')
            .insert({ id: 'rls-admin-place', name: 'Admin Place', country: 'X', longitude: 1, latitude: 1 })
            .select('created_by').single()
        expect(place.error).toBeNull()
        expect(place.data.created_by).toBe(admin.userId)

        const visit = await admin.client.from('visits')
            .insert({ id: 'rls-admin-visit', place_id: 'rls-admin-place', name: 'Admin Visit' })
        expect(visit.error).toBeNull()

        const photo = await admin.client.from('photos')
            .insert({ id: 'rls-admin-photo', visit_id: 'rls-admin-visit', url: 'https://example.com/a.jpg' })
        expect(photo.error).toBeNull()

        await db.from('places').delete().eq('id', 'rls-admin-place')
    })

    it('can change and delete photos', async () => {
        const update = await admin.client.from('photos').update({ alt: 'edited' }).eq('id', FIXTURE.publishedId)
        expect(update.error).toBeNull()
        expect(await altOf(FIXTURE.publishedId)).toBe('edited')

        const del = await admin.client.from('photos').delete().eq('id', FIXTURE.pendingId)
        expect(del.error).toBeNull()
        expect(await altOf(FIXTURE.pendingId)).toBeUndefined()
    })
})
