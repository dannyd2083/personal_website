'use client'
import {useState,useCallback} from "react";
import {Map, Marker, Popup} from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css'

const MapView = ({places, selectedPlace, onPlaceSelect}) => {
    const [hoveredPlace, setHoveredPlace] = useState(null)
    return (
        <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{ longitude: 10, latitude: 20, zoom: 1.4 }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/light-v11"
        onClick={() => onPlaceSelect?.(null)}
        >
            {places.map(place => {const isSelected = selectedPlace?.id === place.id
                    return (
                        <Marker
                            key={place.id}
                            longitude={place.longitude}
                            latitude={place.latitude}
                            onClick={(e) => {
                                e.originalEvent.stopPropagation()
                                onPlaceSelect?.(place)
                            }}
                        >
                            <div
                                onMouseEnter={() => setHoveredPlace(place)}
                                onMouseLeave={() => setHoveredPlace(null)}
                                style={{ cursor: 'pointer' }}
                            >
                                <svg
                                    width={isSelected ? 24 : 16}
                                    height={isSelected ? 24 : 16}
                                    viewBox="0 0 24 24"
                                    style={{ transition: 'all 0.2s ease' }}
                                >
                                    <path
                                        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                                        fill={isSelected ? '#6d4528' : '#a67c5a'}
                                        stroke="#f5f1e8"
                                        strokeWidth="1.5"/>
                                    <circle cx="12" cy="9" r="2.5" fill="#f5f1e8" />
                                </svg>
                            </div>
                        </Marker>
                    )
                })}
            {hoveredPlace && !selectedPlace && (
                <Popup
                    longitude={hoveredPlace.longitude}
                    latitude={hoveredPlace.latitude}
                    closeButton={false}
                    offset={20}
                    className="photo-map-popup">
                <div className="text-xs font-medium px-1">
                    {hoveredPlace.name} · {hoveredPlace.country}
                </div>
                </Popup>
                )}
        </Map>)
}

export default MapView