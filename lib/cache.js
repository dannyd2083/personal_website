import {Redis} from '@upstash/redis'
import { getLastFmStats } from './lastfm';

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
})


const CACHE_KEY = 'music-stats';
const CACHE_DURATION = 3600; // 1 hour in seconds

export async function updateMusicCache() {
    try {
        const stats = await getLastFmStats();

        // Store in Redis with expiration
        await redis.setex(CACHE_KEY, CACHE_DURATION, JSON.stringify(stats));

        return stats;
    } catch (error) {
        console.error('Error updating music cache:', error);
        throw error;
    }
}

export async  function getCachedStats(){
    const stats = await redis.get(CACHE_KEY);
    try {
        if(!stats){
            console.log('No stats in cache, updating...');
            return await updateMusicCache();
        }
        return typeof stats === 'string' ? JSON.parse(stats) : stats;
    }catch (error) {
        console.error('Error getting cached stats:', error);
        return await updateMusicCache();
    }
}

export async function clearMusicCache() {
    try {
        await redis.del(CACHE_KEY);
        return { success: true, message: 'Cache cleared' };
    } catch (error) {
        console.error('Error clearing cache:', error);
        throw error;
    }
}

export async function getCacheStatus() {
    try {
        const ttl = await redis.ttl(CACHE_KEY);
        const exists = await redis.exists(CACHE_KEY);

        return {
            exists: exists === 1,
            ttl: ttl > 0 ? ttl : null,
            expiresIn: ttl > 0 ? `${Math.floor(ttl / 60)} minutes` : null
        };
    } catch (error) {
        console.error('Error getting cache status:', error);
        return { exists: false, ttl: null };
    }
}

