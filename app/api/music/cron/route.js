import { NextResponse } from 'next/server';
import { updateMusicCache } from '@/lib/cache';

export async function GET(request) {
    // Optional: Verify this is a legitimate cron request
    const authHeader = request.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const data = await updateMusicCache();

        return NextResponse.json({
            success: true,
            message: 'Music stats updated successfully',
            data,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Cron job failed:', error);
        return NextResponse.json(
            { error: 'Failed to update music stats' },
            { status: 500 }
        );
    }
}