'use client';
import { useState, useEffect } from 'react';
// import OverviewSection from '@/sections/music/OverviewSection';

const Tabs = () => {
    const [tab, setTab] = useState('overview');
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => setHasMounted(true), []);

    if (!hasMounted) return null; // prevent hydration mismatch

    return (
        <div>
            <div className="bg-white  text-black p-6">
                <button onClick={() => setTab('overview')}>Overview</button>
                <button onClick={() => setTab('artists')}>Artists</button>
                <button onClick={() => setTab('tracks')}>Tracks</button>
                <button onClick={() => setTab('genres')}>Genres</button>
            </div>
            {/* Content */}
            {tab === 'overview' && <div>Overview Tab Content</div>}
            {tab === 'artists' && <div>Artists Tab Content</div>}
            {tab === 'tracks' && <div>Tracks Tab Content</div>}
            {tab === 'genres' && <div>Genres Tab Content</div>}
        </div>
    );
};

export default Tabs;
