// Usage: node tests/db/manual/existing-rows.mjs insert   (after resetting to baseline)
//        node tests/db/manual/existing-rows.mjs check    (after applying later migrations)
import { serviceClient } from '../supabase-local.js'

const db = serviceClient()
const mode = process.argv[2]

if (mode === 'insert') {
    await db.from('places').upsert({ id: 'old-place', name: 'Old', country: 'X', longitude: 0, latitude: 0 })
    await db.from('visits').upsert({ id: 'old-visit', place_id: 'old-place', name: 'Old visit' })
    const { error } = await db.from('photos').upsert([
        { id: 'old-plain', visit_id: 'old-visit',
          url: 'https://res.cloudinary.com/dhjvcitdm/image/upload/f_auto,q_auto/photo-map/uk/uk-london/DSCF1910' },
        { id: 'old-encoded', visit_id: 'old-visit',
          url: 'https://res.cloudinary.com/dhjvcitdm/image/upload/f_auto,q_auto/photo-map/iceland/iceland-dyrh%C3%B3laey/DSCF5622' },
    ])
    if (error) throw error
    console.log('Inserted old-style rows.')
} else if (mode === 'check') {
    const { data, error } = await db.from('photos')
        .select('id, status, cloudinary_public_id').in('id', ['old-plain', 'old-encoded']).order('id')
    if (error) throw error
    console.table(data)
    const plain = data.find(r => r.id === 'old-plain')
    const encoded = data.find(r => r.id === 'old-encoded')
    const ok = plain.status === 'published'
        && plain.cloudinary_public_id === 'photo-map/uk/uk-london/DSCF1910'
        && encoded.status === 'published'
        && encoded.cloudinary_public_id === null
    console.log(ok ? 'PASS' : 'FAIL')
    process.exit(ok ? 0 : 1)
} else {
    console.log('Usage: node tests/db/manual/existing-rows.mjs insert|check')
}
