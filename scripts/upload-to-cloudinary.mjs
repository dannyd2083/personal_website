import { v2 as cloudinary } from 'cloudinary'
import { readdirSync, statSync, unlinkSync } from 'fs'
import { join, basename, extname } from 'path'
import { execSync } from 'child_process'
import { tmpdir } from 'os'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const BASE = '/Users/dannydeng/Desktop/photo-map-upload'
const SKIP_EXTS = new Set(['.mov', '.mp4'])
const MAX_BYTES = 9 * 1024 * 1024 // 9MB to stay safely under Cloudinary's 10MB limit

// Only upload files that haven't been uploaded yet
const ONLY_FAILED = new Set([
    'arnarstapi/DSCF7143.jpg',
    'bruarfoss/DSCF7207.jpg',
    'diamond-beach/DSCF6197.jpg',
    'hverir/DSCF6746.jpg',
    'hvitserkur/DSCF6905.jpg',
    'ingjaldshólskirkja/DSCF7046.jpg',
    'kirkjufell/DSCF7013.jpg',
    'reynisfjara/DSCF5984.jpg',
    'san-francisco/IMG_9518.JPG',
    'studlagil-canyon/DSCF6426.jpg',
    'svartifoss/DSCF6019.jpg',
])

const folders = readdirSync(BASE).filter(name => {
    const full = join(BASE, name)
    return statSync(full).isDirectory() && !name.startsWith('.')
})

let total = ONLY_FAILED.size, done = 0, failed = 0

for (const folder of folders) {
    const dir = join(BASE, folder)
    const files = readdirSync(dir).filter(f => {
        const ext = extname(f).toLowerCase()
        if (f.startsWith('.') || SKIP_EXTS.has(ext)) return false
        return ONLY_FAILED.has(`${folder}/${f}`)
    })

    for (const file of files) {
        const filePath = join(dir, file)
        const publicId = `photo-map/${folder}/${basename(file, extname(file))}`
        let tmpFile = null

        // Resize if over limit
        if (statSync(filePath).size > MAX_BYTES) {
            tmpFile = join(tmpdir(), `resize_${Date.now()}_${file.replace(/[^a-z0-9.]/gi, '_')}.jpg`)
            execSync(`sips -Z 3000 "${filePath}" --out "${tmpFile}" -s format jpeg -s formatOptions 85`)
        }

        try {
            const result = await cloudinary.uploader.upload(tmpFile ?? filePath, {
                public_id: publicId,
                resource_type: 'image',
                overwrite: true,
            })
            done++
            console.log(`✓ [${done}/${total}] ${folder}/${file}`)
            console.log(`  → ${result.secure_url}`)
        } catch (err) {
            failed++
            console.error(`✗ ${folder}/${file}: ${err.message}`)
        } finally {
            if (tmpFile) try { unlinkSync(tmpFile) } catch {}
        }
    }
}

console.log(`\nDone: ${done} uploaded, ${failed} failed`)
