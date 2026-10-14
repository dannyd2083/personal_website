import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { serviceClient, createUserClient, deleteUser } from './supabase-local.js'
import { FIXTURE, seedFixtures, cleanupFixtures, makeAdmin } from './fixtures.js'

const db = serviceClient()
let admin
const vec = (i) => Array.from({ length: 512 }, (_, k) => (k === i ? 1 : 0))

beforeAll(async () => {
    await cleanupFixtures(db)
    await seedFixtures(db)
    await db.from('photos').update({ embedding: vec(0) }).eq('id', FIXTURE.publishedId)
    await db.from('photos').update({ embedding: vec(0) }).eq('id', FIXTURE.pendingId)
    await db.from('photos').insert({
        id: 'search-no-embedding', visit_id: FIXTURE.visitId,
        url: 'https://example.com/none.jpg', status: 'published',
    })
    admin = await createUserClient(`search-admin-${Date.now()}@test.local`)
    await makeAdmin(admin.userId)
})

afterAll(async () => {
    await cleanupFixtures(db)
    await deleteUser(admin.userId)
})

describe('search_photos', () => {
    it('returns only published photos with embeddings, even for the admin', async () => {
        const { data, error } = await admin.client.rpc('search_photos', { query_embedding: vec(0), match_count: 50 })
        expect(error).toBeNull()
        const ids = data.map(p => p.id)
        expect(ids).toContain(FIXTURE.publishedId)
        expect(ids).not.toContain(FIXTURE.pendingId)
        expect(ids).not.toContain('search-no-embedding')
    })
})
