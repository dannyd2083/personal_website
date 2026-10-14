import { serviceClient } from './supabase-local.js'

export const FIXTURE = {
    placeId: 'rls-test-place',
    visitId: 'rls-test-visit',
    publishedId: 'rls-published',
    pendingId: 'rls-pending',
}

async function must(query) {
    const { error } = await query
    if (error) throw error
}

export async function seedFixtures(db) {
    await must(db.from('places').upsert({
        id: FIXTURE.placeId, name: 'RLS Test', country: 'Testland', longitude: 0, latitude: 0,
    }))
    await must(db.from('visits').upsert({ id: FIXTURE.visitId, place_id: FIXTURE.placeId, name: 'RLS Visit' }))
    await must(db.from('photos').upsert([
        { id: FIXTURE.publishedId, visit_id: FIXTURE.visitId, url: 'https://example.com/pub.jpg', alt: 'original', status: 'published' },
        { id: FIXTURE.pendingId, visit_id: FIXTURE.visitId, url: 'https://example.com/pen.jpg', alt: 'original', status: 'pending' },
    ]))
}

export async function cleanupFixtures(db) {
    await db.from('places').delete().eq('id', FIXTURE.placeId) // cascades
}

export async function makeAdmin(userId) {
    const { error } = await serviceClient().from('admin_users').insert({ user_id: userId })
    if (error) throw error
}
