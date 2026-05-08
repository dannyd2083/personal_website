'use client'
import { useEffect } from 'react'
import Image from 'next/image'

const PhotoModal = ({ photo, place, onClose }) => {
    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') onClose() }
        document.addEventListener('keydown', onKey)
        return () => document.removeEventListener('keydown', onKey)
    }, [onClose])

    if (!photo) return null

    const visit = place?.visits?.find(v => v.photos.some(p => p.id === photo.id))

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
            onClick={onClose}
        >
            <div
                className="relative flex flex-col items-center mx-4 max-w-4xl w-full"
                onClick={e => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute -top-10 right-0 text-white/60 hover:text-white text-3xl leading-none"
                >
                    ×
                </button>

                {/* Photo */}
                <div className="relative w-full h-[70vh]">
                    <Image
                        src={photo.url}
                        alt={photo.alt || ''}
                        fill
                        className="object-contain rounded-lg"
                        sizes="(max-width: 1024px) 95vw, 896px"
                        priority
                    />
                </div>

                {/* Metadata */}
                <div className="flex gap-6 mt-4 text-white/60 text-sm">
                    {photo.place_name && <span>{photo.place_name}{photo.visit_name ? ` · ${photo.visit_name}` : ''}</span>}
                    {visit?.date && <span>{visit.date}</span>}
                    {place?.camera && <span>Shot on {place.camera}</span>}
                </div>
            </div>
        </div>
    )
}

export default PhotoModal
