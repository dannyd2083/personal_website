import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { serviceClient } from './supabase-local.js'

const db = serviceClient()
const PLACE = { id: 'cols-test-place', name: 'Cols Test', country: 'Testland', longitude: 0, latitude: 0 }
const VISIT = { id: 'cols-test-visit', place_id: PLACE.id, name: 'Cols Visit' }

beforeAll(async () => {
    await db.from('places').upsert(PLACE)
    await db.from('visits').upsert(VISIT)
})

afterAll(async () => {
    await db.from('places').delete().eq('id', PLACE.id) // cascades to visits and photos
})

describe('photo columns', () => {
    it('new photos default to pending', async () => {
        const { data, error } = await db.from('photos')
            .insert({ id: 'cols-new', visit_id: VISIT.id, url: 'https://example.com/a.jpg' })
            .select('status, error, cloudinary_public_id, created_at')
            .single()
        expect(error).toBeNull()
        expect(data.status).toBe('pending')
        expect(data.error).toBeNull()
        expect(data.created_at).toBeTruthy()
    })

    it('rejects a status that is not pending or published', async () => {
        const { error } = await db.from('photos')
            .insert({ id: 'cols-bad', visit_id: VISIT.id, url: 'https://example.com/b.jpg', status: 'failed' })
        expect(error).not.toBeNull()
        expect(error.code).toBe('23514') // check_violation
    })

    it('places and visits have audit columns', async () => {
        const places = await db.from('places').select('created_at, created_by').eq('id', PLACE.id).single()
        const visits = await db.from('visits').select('created_at, created_by').eq('id', VISIT.id).single()
        expect(places.error).toBeNull()
        expect(visits.error).toBeNull()
        expect(places.data.created_at).toBeTruthy()
    })
})
