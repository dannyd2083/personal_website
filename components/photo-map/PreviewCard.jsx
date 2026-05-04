import Link from "next/link";
import Image from "next/image";

const PreviewCard = ({place,activeVisit,onVisitChange}) =>{
    if(!place) return null;
    return (
        <div className="bg-clay-cream border-t border-clay-dust">
            <div className="grid grid-cols-1 md:grid-cols-[240px_1fr]">
                {/* Cover photo */}
                <div className="relative h-48 md:h-full min-h-[192px]">
                    <Image
                        src={place.cover_photo}
                        alt={place.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 240px"
                    />
                </div>

                {/* Info panel */}
                <div className="p-6">
                    <h2 className="text-3xl font-bold text-clay-charcoal font-AbrilFatface">
                        {place.name}
                    </h2>
                    <p className="text-clay-court-light text-sm mb-3">{place.country}</p>
                    <p className="text-clay-charcoal text-sm mb-3 line-clamp-2">
                        {place.description}
                    </p>
                    {place.camera && (
                        <p className="text-clay-court-light text-xs mb-4">Shot on {place.camera}</p>
                    )}
                    <Link
                        href={`/photo-map/${place.id}`}
                        className="inline-flex items-center gap-2 bg-clay-court-dark text-clay-cream text-sm px-4 py-2 rounded-md hover:bg-clay-court transition-colors"
                    >
                        View place →
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default PreviewCard