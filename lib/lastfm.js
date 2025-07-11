const LASTFM_API_KEY = process.env.LASTFM_API_KEY;
const LASTFM_USERNAME = process.env.LASTFM_USERNAME;
const BASE_URL = 'https://ws.audioscrobbler.com/2.0/';

export async function getLastFmStats() {
    try {
        // Fetch user info and loved tracks in parallel
        const [userInfoResponse, lovedTracksResponse] = await Promise.all([
            fetch(`${BASE_URL}?method=user.getinfo&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json`),
            fetch(`${BASE_URL}?method=user.getlovedtracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json&limit=1`)
        ]);

        const [userInfo, lovedTracks] = await Promise.all([
            userInfoResponse.json(),
            lovedTracksResponse.json()
        ]);

        // Calculate stats
        const totalScrobbles = parseInt(userInfo.user.playcount);
        const approximateMinutes = Math.round(totalScrobbles * 3.5); // Average 3.5 min/song
        const tracksLoved = parseInt(lovedTracks.lovedtracks['@attr'].total);
        const registered = new Date(userInfo.user.registered.unixtime * 1000);


        return {
            totalMinutes: approximateMinutes,
            tracksLoved: tracksLoved,
            totalScrobbles: totalScrobbles,
            registered: registered.toISOString()
        };
    } catch (error) {
        console.error('Last.fm API error:', error);
        throw new Error('Failed to fetch Last.fm data');
    }
}

export async function getRecentTracks(limit = 5) {
    try {
        const response = await fetch(
            `${BASE_URL}?method=user.getrecenttracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json&limit=${limit}`
        );
        const data = await response.json();
        return data.recenttracks.track;
    } catch (error) {
        console.error('Error fetching recent tracks:', error);
        throw new Error('Failed to fetch recent tracks');
    }
}