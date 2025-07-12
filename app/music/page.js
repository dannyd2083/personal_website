'use client';
import ListeningStats from "@/sections/music/ListeningStats";
import ComingSoon from "@/sections/music/ComingSoon";
import MusicSection from "@/components/music/MusicSection";

const MusicPage = () => {
    return (
        <div className="min-h-screen bg-clay-court py-8">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-clay-cream mb-4">
                        My Music Stats
                    </h1>
                    <p className="text-clay-dust max-w-2xl mx-auto">
                        Real-time listening statistics powered by Last.fm
                    </p>
                </div>
                <ListeningStats />
                <MusicSection
                    title="Recent Tracks"
                    dataKey="recentTracks"
                    type="track"
                    limit={10}
                />

                <MusicSection 
                    title="Weekly Top Tracks" 
                    dataKey="weeklyTopTracks" 
                    type="track" 
                    limit={10} 
                />

                <MusicSection 
                    title="Weekly Top Artists" 
                    dataKey="weeklyTopArtists" 
                    type="artist" 
                    limit={10} 
                />

                <MusicSection 
                    title="All Time Top Tracks"
                    dataKey="allTimeTopTracks" 
                    type="track" 
                    limit={10} 
                />

                <MusicSection 
                    title="All Time Top Artists" 
                    dataKey="allTimeTopArtists" 
                    type="artist" 
                    limit={10} 
                />

                {/*<ComingSoon/>*/}
                {/*<Tabs />*/}
            </div>
        </div>
    );
}


export default MusicPage;
