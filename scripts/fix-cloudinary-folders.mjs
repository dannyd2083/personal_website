import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: 'dhjvcitdm',
    api_key: '354125659558684',
    api_secret: 'aGAs-RZqCPOz4ioRhP4wKHuxNy0',
})

// Fetch all assets under photo-map
let resources = []
let next_cursor = null
do {
    const res = await cloudinary.api.resources({
        type: 'upload',
        prefix: 'photo-map/',
        max_results: 500,
        ...(next_cursor ? { next_cursor } : {}),
    })
    resources.push(...res.resources)
    next_cursor = res.next_cursor
} while (next_cursor)

console.log(`Found ${resources.length} assets to move`)

let done = 0, failed = 0
for (const asset of resources) {
    // public_id: "photo-map/bath/DSCF2552" → asset_folder: "photo-map/bath"
    const parts = asset.public_id.split('/')
    const assetFolder = parts.slice(0, -1).join('/')
    try {
        await cloudinary.api.update(asset.public_id, { asset_folder: assetFolder })
        done++
        console.log(`✓ [${done}/${resources.length}] ${asset.public_id} → ${assetFolder}`)
    } catch (err) {
        failed++
        console.error(`✗ ${asset.public_id}: ${err.message}`)
    }
}

console.log(`\nDone: ${done} moved, ${failed} failed`)
