import Image from 'next/image'

const ThumbnailStrip = ({visits, activeVisit}) => {
    const photos = activeVisit
    ? visits.find(visit => visit.id === activeVisit)?.photos??[]
        : visits.flatMap(v => v.photos)
    if(photos.length === 0) return null;
    return(
        <div className="flex gap-3 overflow-x-auto px-6 pb-6 pt-3">
            {photos.map(photo => (
                <div key={photo.id} className="relative flex-shrink-0 w-[120px] h-[80px] rounded-md overflow-hidden">
                    <Image
                        src={photo.url}
                        alt={photo.alt ||'Photo'}
                        fill
                        className="object-cover"
                        sizes="120px"
                    />
                </div>
            ))}
        </div>
    )
}

export default ThumbnailStrip;