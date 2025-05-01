'use client';
import Tabs from '@/components/music/Tabs';
import ListeningStats from "@/sections/music/ListeningStats";

const MusicPage = () => {
    return (
        <>
            <ListeningStats />
            <Tabs />
        </>
    );
};

export default MusicPage;
