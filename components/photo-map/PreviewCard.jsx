import Image from "next/image";

const PreviewCard = ({ place, selectedPhoto, onPhotoClick }) => {
    if (!place) return null;
    const totalPhotos = place.visits.reduce((s, v) => s + (v.photos?.length ?? 0), 0)
    const totalVisits = place.visits.length

    const displayUrl = (selectedPhoto?.url ?? place.cover_photo)
        .replace('/f_auto,q_auto/', '/f_auto,q_auto,c_fill,g_auto,ar_3:2/')

    return (
        <div className="bg-clay-cream">
            <div className="flex flex-col md:flex-row min-h-[420px]">
                {/* Cover photo — click to open modal */}
                <div
                    className="group relative w-full md:w-[45%] h-64 md:h-auto flex-shrink-0 cursor-zoom-in"
                    onClick={onPhotoClick}
                >
                    <Image
                        src={displayUrl}
                        alt={selectedPhoto?.alt || place.name}
                        fill
                        unoptimized
                        className="object-cover"
                    />
                    {/* expand hint on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-3xl leading-none select-none">⤢</span>
                    </div>
                </div>

                {/* Info panel */}
                <div className="flex flex-col justify-center p-8 gap-3">
                    <div>
                        <h2 className="text-4xl text-clay-charcoal font-AbrilFatface leading-tight">
                            {place.name}
                        </h2>
                        <p className="text-clay-court-light text-sm mt-1">{place.country}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-clay-charcoal opacity-60">
                        <span>{totalVisits} location{totalVisits !== 1 ? 's' : ''} · {totalPhotos} photo{totalPhotos !== 1 ? 's' : ''}</span>
                        {place.last_photographed && (
                            <span>Last photographed: {place.last_photographed}</span>
                        )}
                    </div>

                    <p className="text-clay-charcoal text-sm line-clamp-3 max-w-prose">
                        {place.description}
                    </p>

                    {place.camera && (
                        <p className="text-clay-court-light text-xs">Shot on {place.camera}</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PreviewCard