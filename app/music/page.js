'use client';
import Tabs from '@/components/music/Tabs';
import ListeningStats from "@/sections/music/ListeningStats";
import ComingSoon from "@/sections/music/ComingSoon";

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
                <ComingSoon/>
                {/*<Tabs />*/}
            </div>
        </div>
    );
}


export default MusicPage;
