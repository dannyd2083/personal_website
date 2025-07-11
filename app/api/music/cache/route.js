import { NextResponse } from 'next/server';
import { clearMusicCache, getCacheStatus } from '@/lib/cache';

export async function DELETE() {
    try {
        const result = await clearMusicCache();
        return NextResponse.json(result);
    } catch (error) {
        console.error('Error clearing cache:', error);
        return NextResponse.json(
            { error: 'Failed to clear cache' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const status = await getCacheStatus();
        return NextResponse.json(status);
    } catch (error) {
        console.error('Error getting cache status:', error);
        return NextResponse.json(
            { error: 'Failed to get cache status' },
            { status: 500 }
        );
    }
}