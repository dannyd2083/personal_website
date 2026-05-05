'use client';
import {useState,useEffect,useCallback,useRef} from "react";
import {motion} from "framer-motion";
import MapView from '@/components/photo-map/MapView'
import PreviewCard from '@/components/photo-map/PreviewCard'
import VisitChips from '@/components/photo-map/VisitChips'
import ThumbnailStrip from '@/components/photo-map/ThumbnailStrip'
import SearchBar from '@/components/photo-map/SearchBar'
import FilterGallery from '@/components/photo-map/FilterGallery'

const PhotoMap = () => {
    const[places, setPlaces] = useState([])
    const[selectedPlace, setSelectedPlace] = useState(null)
    const[activeVisit,setActiveVisit] = useState(null)
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
            .then(({ places }) => setPlaces(places ?? []))
    }, [])

    useEffect(() => {
        setActiveVisit(null)
    }, [selectedPlace])

    const handleClear = useCallback(() => {
        setSearchResults(null)
        setSearchQuery('')
    }, [])

    const handleSearch = useCallback(async (query) => {
        setIsSearching(true)
        setSearchQuery(query)
        setSelectedPlace(null)
        const res = await fetch(`/api/photo-map/search?q=${encodeURIComponent(query)}`)
        const { photos } = await res.json()
        setSearchResults(photos ?? [])
        setIsSearching(false)
    }, [])

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
            {/* Map fills full height in idle; search bar and hint float on top of it */}
            <div style={{
                flex: isIdle ? '1 1 0' : '0 0 auto',
                height: isIdle ? undefined : (isSearchMode ? '80px' : '420px'),
                overflow: 'hidden',
                transition: 'height 0.4s ease-in-out',
                position: 'relative',
                minHeight: 0
            }}>
                <MapView places={places} selectedPlace={selectedPlace} onPlaceSelect={isSearchMode ? null : setSelectedPlace} />

                {/* Search bar floats over the map, behind the navbar (z-index 9 < navbar z-10) */}
                <div style={{ position: 'absolute', top: 12, left: 0, right: 0, zIndex: 9, padding: '0 16px' }}>
                    <SearchBar onSearch={handleSearch} onClear={handleClear} isLoading={isSearching} />
                    {isIdle && (
                        <p className="text-center text-xs mt-2 pointer-events-none" style={{ color: 'rgba(59,42,26,0.8)', textShadow: '0 1px 4px rgba(255,255,255,0.95)' }}>
                            Click a pin to explore · or search by mood above
                        </p>
                    )}
                </div>
            </div>

            {/* Browse mode */}
            {!isSearchMode && selectedPlace && (
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
                    <PreviewCard place={selectedPlace} />
                    <div className="bg-clay-cream">
                        <VisitChips visits={selectedPlace.visits} activeVisit={activeVisit} onVisitChange={setActiveVisit} />
                        <ThumbnailStrip visits={selectedPlace.visits} activeVisit={activeVisit} />
                    </div>
                </motion.div>
            )}

            {/* Search mode */}
            {isSearchMode && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                    <FilterGallery photos={searchResults} query={searchQuery} />
                </motion.div>
            )}
        </div>
)
}

export default PhotoMap;