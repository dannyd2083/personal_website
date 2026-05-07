import Image from 'next/image'
import { useEffect } from 'react'

const LARGE_TRANSFORM = '/f_auto,q_auto,c_fill,g_auto,ar_3:2/'
const largeSrc = (url) => url.replace('/f_auto,q_auto/', LARGE_TRANSFORM)

const ThumbnailStrip = ({ visits, activeVisit, selectedPhoto, onPhotoSelect }) => {
    const photos = activeVisit
        ? visits.find(v => v.id === activeVisit)?.photos ?? []
        : visits.flatMap(v => v.photos)

    // Preload large-format images so switching feels instant
    useEffect(() => {
        photos.forEach(photo => {
            const img = new window.Image()
            img.src = largeSrc(photo.url)
        })
    }, [photos])

    if (photos.length === 0) return null;
    return (
        <div className="flex gap-3 overflow-x-auto px-6 pb-6 pt-2">
            {photos.map(photo => {
                const thumbUrl = photo.url.replace('/f_auto,q_auto/', '/f_auto,q_auto,c_fill,g_auto,w_360,h_240/')
                const isSelected = selectedPhoto?.id === photo.id
                return (
                    <div
                        key={photo.id}
                        onClick={() => onPhotoSelect(photo)}
                        className={`relative flex-shrink-0 w-[180px] h-[120px] rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${isSelected ? 'ring-2 ring-clay-court-dark ring-offset-2' : 'opacity-80 hover:opacity-100'}`}
                    >
                        <Image
                            src={thumbUrl}
                            alt={photo.alt || 'Photo'}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                            sizes="180px"
                        />
                    </div>
                )
            })}
        </div>
    )
}

export default ThumbnailStrip;