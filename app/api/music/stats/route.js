import { NextResponse } from 'next/server';
import { getLastFmStats } from '@/lib/lastfm';

export async function GET() {
    try {
        const stats = await getLastFmStats();
        return NextResponse.json(stats);
    } catch (error) {
        console.error('Error fetching Last.fm stats:', error);
        return NextResponse.json(
            { error: 'Failed to fetch music stats' },
            { status: 500 }
        );
    }
}