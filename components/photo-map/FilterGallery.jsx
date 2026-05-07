import Image from "next/image";

const FilterGallery = ({photos, query}) => {
    if(!photos) return;
    return(
        <div>
            <p>{photos.length} photos matching &ldquo;{query}&rdquo;</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {photos.map(photo => (
                    <div key={photo.id} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                        <Image fill src={photo.url} alt={photo.alt || ''} className="object-cover" sizes="25vw" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-2 py-2">
                            <span className="text-white text-xs font-medium">{photo.place_name}</span>
                            <span className="text-white/60 text-xs ml-1">· {photo.country}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FilterGallery;