'use client';
import React, {useEffect, useState} from 'react';

const ListeningStats = () => {
    // You can replace these with props or API data later
    const totalMinutes = 10652;
    const tracksLoved = 28;

    // const [hasMounted, setHasMounted] = useState(false);
    //
    // useEffect(() => setHasMounted(true), []);

    return (
        <div className="w-full max-w-5xl mx-auto mb-8 px-4 mt-8">
            <div className="flex flex-wrap justify-around items-center gap-y-8 text-center">
                {/* Minutes listened */}
                <div className="min-w-[120px]">
                    <p className="text-4xl font-bold text-yellow-400">{totalMinutes.toLocaleString()}</p>
                    <p className="text-sm text-white">minutes listened</p>
                </div>

                {/* Tracks loved */}
                <div className="min-w-[120px]">
                    <p className="text-4xl font-bold text-yellow-400">{tracksLoved}</p>
                    <p className="text-sm text-white">tracks loved</p>
                </div>
            </div>
        </div>
    );
};

export default ListeningStats;
