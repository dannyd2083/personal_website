'use client';
import React, { useEffect, useState } from 'react';
import MusicGrid from './MusicGrid';
import ArtistGrid from './ArtistGrid';

const MusicSection = ({ 
    title, 
    dataKey, 
    type = 'track',
    limit = 10
}) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/music/stats');

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (data.error) {
                    setError(data.error);
                    setLoading(false);
                    return;
                }

                const sectionData = data[dataKey] || [];

                setItems(sectionData.slice(0, limit));
                setLoading(false);
            } catch (error) {
                console.error(`Error fetching ${dataKey}:`, error);
                setError(`Failed to fetch ${dataKey}`);
                setLoading(false);
            }
        };

        fetchData();
    }, [dataKey, limit]);

    return type === 'artist' ? (
        <ArtistGrid
            title={title}
            items={items}
            loading={loading}
            error={error}
        />
    ) : (
        <MusicGrid
            title={title}
            items={items}
            loading={loading}
            error={error}
            type={type}
        />
    );
};

export default MusicSection;
