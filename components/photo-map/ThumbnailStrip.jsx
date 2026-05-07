import Image from 'next/image'

const ThumbnailStrip = ({ visits, activeVisit }) => {
    const photos = activeVisit
        ? visits.find(v => v.id === activeVisit)?.photos ?? []
        : visits.flatMap(v => v.photos)
    if (photos.length === 0) return null;
    return (
        <div className="flex gap-3 overflow-x-auto px-6 pb-6 pt-2">
            {photos.map(photo => {
                const thumbUrl = photo.url.replace('/f_auto,q_auto/', '/f_auto,q_auto,c_fill,g_auto,w_360,h_240/')
                return (
                    <div key={photo.id} className="relative flex-shrink-0 w-[180px] h-[120px] rounded-lg overflow-hidden">
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