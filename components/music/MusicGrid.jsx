'use client';
import React from 'react';

// Placeholder SVG for missing images
const PLACEHOLDER_SVG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23e2d9c2'/%3E%3Cpath d='M50,30 L70,50 L50,70 L30,50 Z' fill='%238b5a3c'/%3E%3C/svg%3E";

const MusicGrid = ({ 
    title, 
    items = [], 
    loading = false, 
    error = null
}) => {
    // Function to handle image errors and provide an inline SVG placeholder
    const handleImageError = (e) => {
        e.target.src = PLACEHOLDER_SVG;
    };

    //  image URL
    const getBestImageUrl = (item) => {
        if (!item.image || item.image.length === 0) {
            return null;
        }

        // Get the largest image (last in the array)
        const largestImage = item.image[item.image.length - 1]['#text'];

        // Check if it's a valid image URL
        if (largestImage && largestImage.length > 10) {
            return largestImage;
        }

        return null;
    };

    // Function to get the track URL
    const getTrackUrl = (item) => {
        return item.spotifyUrl || item.url || `https://open.spotify.com/search/${encodeURIComponent(`${item.artist.name} ${item.name}`)}`;
    };

    // Function to get the track name
    const getTrackName = (item) => {
        return item.name || '';
    };

    // Function to get the artist name
    const getArtistName = (item) => {
        return item.artist ? item.artist.name || '' : '';
    };

    // Function to get the play count or listener count
    const getPlayCount = (item) => {
        if (item.playcount) {
            return `${item.playcount} plays`;
        } else if (item.listeners) {
            return `${item.listeners} listeners`;
        }
        return '';
    };

    return (
        <div className="w-full max-w-5xl mx-auto mb-12 px-4">
            <h2 className="text-2xl font-bold text-clay-cream mb-6 text-center">
                {title}
            </h2>

            {loading && (
                <div className="text-center text-clay-cream">Loading...</div>
            )}

            {error && (
                <div className="text-center text-red-400 mb-4">
                    Error: {error}
                </div>
            )}

            {!loading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {items.map((item, index) => (
                        <a 
                            key={`${getTrackName(item)}-${index}`}
                            href={getTrackUrl(item)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-clay-cream rounded-lg overflow-hidden shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 flex flex-col cursor-pointer"
                        >
                            <div className="relative pb-[100%]">
                                <img 
                                    src={getBestImageUrl(item) || PLACEHOLDER_SVG}
                                    alt={`${getTrackName(item)} album cover`}
                                    onError={handleImageError}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-3 flex-grow flex flex-col">
                                <h3 className="font-medium text-clay-charcoal text-sm mb-1 line-clamp-2">
                                    {getTrackName(item)}
                                </h3>
                                {getArtistName(item) && (
                                    <p className="text-clay-dust text-xs mb-1">
                                        {getArtistName(item)}
                                    </p>
                                )}
                                <div className="flex justify-between items-center mt-auto">
                                    <p className="text-clay-dust text-xs opacity-75">
                                        {item['@attr']?.nowplaying === 'true' ? (
                                            <span className="text-clay-forest font-medium">Now Playing</span>
                                        ) : (
                                            getPlayCount(item)
                                        )}
                                    </p>
                                    <span className="text-xs text-clay-forest">
                                        Listen ↗
                                    </span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MusicGrid;
