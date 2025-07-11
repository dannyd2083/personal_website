
'use client';
import React, {useEffect, useState} from 'react';

const ListeningStats = () => {
    const [stats, setStats] = useState(
        {
            totalMinutes: 0,
            registered: '',
            loading: true,
            error: null,
            cacheInfo: null
        }
    )

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('/api/music/update');

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (data.error) {
                    setStats(prev => ({
                        ...prev,
                        error: data.error,
                        loading: false
                    }));
                    return;
                }

                const totalMinutes = typeof data.totalMinutes === 'number' ? data.totalMinutes : 0;
                const registered = typeof data.registered === 'string' ? data.registered : '';
                console.log('Registered date from API:', registered);

                setStats({
                    totalMinutes,
                    registered,
                    loading: false,
                    error: null,
                    cacheInfo: data._cache
                });
            } catch (error) {
                console.error('Error fetching music stats:', error);
                setStats(prev => ({
                    ...prev,
                    error: 'Failed to fetch music stats',
                    loading: false
                }));
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="w-full max-w-5xl mx-auto mb-8 px-4 mt-8">
            {stats.loading && (
                <div className="text-center text-clay-cream">Loading...</div>
            )}

            {stats.error && (
                <div className="text-center text-red-400 mb-4">
                    Error: {stats.error}
                </div>
            )}

            {!stats.loading && !stats.error && (
                <div className="flex flex-wrap justify-around items-center gap-y-8 text-center">
                    <div className="min-w-[120px]">
                        <p className="text-4xl font-bold text-clay-dust">
                            {stats.totalMinutes.toLocaleString()}
                        </p>
                        <p className="text-sm text-clay-cream">Avg minutes listened</p>
                    </div>

                    <div className="min-w-[120px]">
                        <p className="text-4xl font-bold text-clay-dust">
                            {new Date(stats.registered).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-clay-cream">Since</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListeningStats;