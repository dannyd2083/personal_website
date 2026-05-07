import Link from "next/link";
import Image from "next/image";

const PreviewCard = ({ place }) => {
    if (!place) return null;
    const totalPhotos = place.visits.reduce((s, v) => s + (v.photos?.length ?? 0), 0)
    const totalVisits = place.visits.length
    // Force a 3:2 smart crop via Cloudinary so portrait photos don't get awkwardly clipped
    const coverUrl = place.cover_photo.replace('/f_auto,q_auto/', '/f_auto,q_auto,c_fill,g_auto,ar_3:2/')

    return (
        <div className="bg-clay-cream">
            <div className="flex flex-col md:flex-row min-h-[280px]">
                {/* Cover photo */}
                <div className="relative w-full md:w-[45%] h-64 md:h-auto flex-shrink-0">
                    <Image
                        src={coverUrl}
                        alt={place.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 45vw"
                    />
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
                        <span>{totalVisits} visit{totalVisits !== 1 ? 's' : ''} · {totalPhotos} photo{totalPhotos !== 1 ? 's' : ''}</span>
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

                    <div className="mt-1">
                        <Link
                            href={`/photo-map/${place.id}`}
                            className="inline-flex items-center gap-2 bg-clay-court-dark text-clay-cream text-sm px-5 py-2.5 rounded-md hover:bg-clay-court transition-colors"
                        >
                            View place →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PreviewCard