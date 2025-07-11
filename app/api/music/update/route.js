//@ts-nocheck
import { NextResponse } from 'next/server';
import { updateMusicCache, getCachedStats, getCacheStatus } from '@/lib/cache';

export async function POST() {
    try {
        const data = await updateMusicCache();
        return NextResponse.json({
            success: true,
            data,
            message: 'Cache updated successfully'
        });
    } catch (error) {
        console.error('Error updating music stats:', error);
        return NextResponse.json(
            { error: 'Failed to update music stats' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const stats = await getCachedStats();
        const cacheStatus = await getCacheStatus();

        return NextResponse.json({
            ...stats,
            _cache: cacheStatus
        });
    } catch (error) {
        console.error('Error getting cached music stats:', error);
        return NextResponse.json(
            { error: 'Failed to get music stats' },
            { status: 500 }
        );
    }
}
