'use client';
import React from 'react';

const ArtistGrid = ({ 
    title, 
    items = [], 
    loading = false, 
    error = null 
}) => {
    // Function to get the appropriate URL for the artist
    const getArtistUrl = (artist) => {
        return artist.spotifyUrl || artist.url || `https://open.spotify.com/search/${encodeURIComponent(artist.name)}`;
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {items.map((artist, index) => (
                        <a 
                            key={`${artist.name}-${index}`}
                            href={getArtistUrl(artist)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-clay-cream rounded-lg p-4 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 flex flex-col cursor-pointer"
                        >
                            <h3 className="font-medium text-clay-charcoal text-lg mb-1 line-clamp-2">
                                {artist.name}
                            </h3>
                            <div className="flex justify-between items-center mt-2">
                                <p className="text-clay-forest text-sm opacity-75">
                                    {artist.playcount ? `${artist.playcount} plays` : ''}
                                </p>
                                <span className="text-xs text-clay-forest">
                                    View on Spotify ↗
                                </span>
                            </div>
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ArtistGrid;