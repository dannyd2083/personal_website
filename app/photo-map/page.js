'use client';
import {useState,useEffect,useCallback,useRef,Suspense} from "react";
import {useRouter,useSearchParams} from "next/navigation";
import {motion} from "framer-motion";
import MapView from '@/components/photo-map/MapView'
import PreviewCard from '@/components/photo-map/PreviewCard'
import VisitChips from '@/components/photo-map/VisitChips'
import ThumbnailStrip from '@/components/photo-map/ThumbnailStrip'
import SearchBar from '@/components/photo-map/SearchBar'
import FilterGallery from '@/components/photo-map/FilterGallery'
import PhotoModal from '@/components/photo-map/PhotoModal'

const PhotoMap = () => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const[places, setPlaces] = useState([])
    const[selectedPlace, setSelectedPlace] = useState(null)
    const[activeVisit,setActiveVisit] = useState(null)
    const[selectedPhoto, setSelectedPhoto] = useState(null)
    const[modalPhoto, setModalPhoto] = useState(null)
    const[searchResults,setSearchResults] = useState(null)
    const[searchQuery,setSearchQuery] = useState('')
    const[isSearching,setIsSearching] = useState(false)
    const pageRef = useRef(null)
    const [availableHeight, setAvailableHeight] = useState(null)

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' })
    }, [])

    useEffect(() => {
        const measure = () => {
            if (pageRef.current) {
                const top = pageRef.current.getBoundingClientRect().top
                setAvailableHeight(window.innerHeight - top)
            }
        }
        measure()
        window.addEventListener('resize', measure)
        return () => window.removeEventListener('resize', measure)
    }, [])

    useEffect(() => {
        fetch('/api/photo-map/places')
            .then(r => r.json())
            .then(({ places }) => {
                setPlaces(places ?? [])
                const placeId = searchParams.get('place')
                if (placeId) {
                    const match = (places ?? []).find(p => p.id === placeId)
                    if (match) setSelectedPlace(match)
                }
            })
    }, [])

    useEffect(() => {
        setActiveVisit(null)
        setSelectedPhoto(null)
    }, [selectedPlace])

    useEffect(() => {
        setSelectedPhoto(null)
    }, [activeVisit])

    const handlePlaceSelect = useCallback((place) => {
        setSelectedPlace(place)
        if (place) {
            router.replace(`?place=${place.id}`, { scroll: false })
        } else {
            router.replace('?', { scroll: false })
        }
    }, [router])

    const handleClear = useCallback(() => {
        setSearchResults(null)
        setSearchQuery('')
    }, [])

    const handleSearch = useCallback(async (query) => {
        setIsSearching(true)
        setSearchQuery(query)
        setSelectedPlace(null)
        router.replace('?', { scroll: false })
        const res = await fetch(`/api/photo-map/search?q=${encodeURIComponent(query)}`)
        const { photos } = await res.json()
        setSearchResults(photos ?? [])
        setIsSearching(false)
    }, [router])

    const isSearchMode = searchResults !== null
    const isIdle = !isSearchMode && !selectedPlace
    return (
        <div
            ref={pageRef}
            className="bg-clay-court-dark"
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: isIdle ? (availableHeight ? `${availableHeight}px` : '100vh') : 'auto',
                minHeight: '100vh',
                overflow: isIdle ? 'hidden' : 'visible'
            }}
        >
            <div style={{
                flex: isIdle ? '1 1 0' : '0 0 auto',
                height: isIdle ? undefined : (isSearchMode ? '80px' : '420px'),
                overflow: 'hidden',
                transition: 'height 0.4s ease-in-out',
                position: 'relative',
                minHeight: 0
            }}>
                <MapView places={places} selectedPlace={selectedPlace} onPlaceSelect={isSearchMode ? null : handlePlaceSelect} />

                <div style={{ position: 'absolute', top: 12, left: 0, right: 0, zIndex: 9, padding: '0 16px' }}>
                    <SearchBar onSearch={handleSearch} onClear={handleClear} isLoading={isSearching} />
                    {isIdle && (
                        <p className="text-center text-xs mt-2 pointer-events-none" style={{ color: 'rgba(59,42,26,0.8)', textShadow: '0 1px 4px rgba(255,255,255,0.95)' }}>
                            Click a pin to explore · or search by mood above
                        </p>
                    )}
                </div>
            </div>

            {!isSearchMode && selectedPlace && (
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
                    className="bg-clay-cream px-4 md:px-8 pt-6 pb-8"
                >
                    <div className="rounded-2xl overflow-hidden shadow-md">
                        <PreviewCard
                            place={selectedPlace}
                            selectedPhoto={selectedPhoto}
                            onPhotoClick={() => setModalPhoto(selectedPhoto ?? { url: selectedPlace.cover_photo, alt: selectedPlace.name, id: '__cover__' })}
                        />
                        <VisitChips visits={selectedPlace.visits} activeVisit={activeVisit} onVisitChange={setActiveVisit} />
                        <ThumbnailStrip
                            visits={selectedPlace.visits}
                            activeVisit={activeVisit}
                            selectedPhoto={selectedPhoto}
                            onPhotoSelect={setSelectedPhoto}
                        />
                    </div>
                </motion.div>
            )}

            <PhotoModal
                photo={modalPhoto}
                place={selectedPlace}
                onClose={() => setModalPhoto(null)}
            />

            {isSearchMode && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                    <FilterGallery photos={searchResults} query={searchQuery} onPhotoClick={setModalPhoto} />
                </motion.div>
            )}
        </div>
    )
}

export default function Page() {
    return (
        <Suspense>
            <PhotoMap />
        </Suspense>
    )
}
