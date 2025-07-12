const LASTFM_API_KEY = process.env.LASTFM_API_KEY;
const LASTFM_USERNAME = process.env.LASTFM_USERNAME;
const BASE_URL = 'https://ws.audioscrobbler.com/2.0/';


// Function to get artwork from iTunes API
async function getItunesArtwork(query, entityType = 'musicTrack') {
    try {
        const response = await fetch(
            `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&entity=${entityType}&limit=1`
        );

        if (!response.ok) return null;

        const data = await response.json();

        if (data.resultCount > 0) {
            // Get the artwork URL and replace the 100x100 with a larger size
            let artworkUrl = data.results[0].artworkUrl100;
            if (artworkUrl) {
                // Replace 100x100 with 600x600 for higher resolution
                artworkUrl = artworkUrl.replace('100x100', '600x600');
                return artworkUrl;
            }
        }
        return null;
    } catch (error) {
        console.error('Error fetching iTunes artwork:', error);
        return null;
    }
}

// Function to enhance track data with better images and URLs
async function enhanceTrackData(track) {
    // Start with the original track data
    const enhancedTrack = { ...track };

    // Add Last.fm URL if not present
    if (!enhancedTrack.url) {
        enhancedTrack.url = `https://www.last.fm/music/${encodeURIComponent(track.artist.name)}/_/${encodeURIComponent(track.name)}`;
    }

    // Add Spotify search URL
    enhancedTrack.spotifyUrl = `https://open.spotify.com/search/${encodeURIComponent(`${track.artist.name} ${track.name}`)}`;

    // Try to get artwork from iTunes
    const query = `${track.artist.name} ${track.name}`;
    const itunesArtwork = await getItunesArtwork(query, 'musicTrack');

    if (itunesArtwork) {
        // Create a compatible image structure that matches Last.fm's format
        enhancedTrack.image = [
            { '#text': itunesArtwork, size: 'small' },
            { '#text': itunesArtwork, size: 'medium' },
            { '#text': itunesArtwork, size: 'large' },
            { '#text': itunesArtwork, size: 'extralarge' }
        ];
    }

    return enhancedTrack;
}

// Function to enhance artist data with URLs
function enhanceArtistData(artist) {
    // Start with the original artist data
    const enhancedArtist = { ...artist };

    // Add Last.fm URL if not present
    if (!enhancedArtist.url) {
        enhancedArtist.url = `https://www.last.fm/music/${encodeURIComponent(artist.name)}`;
    }

    // Add Spotify search URL
    enhancedArtist.spotifyUrl = `https://open.spotify.com/search/${encodeURIComponent(artist.name)}`;

    return enhancedArtist;
}

export async function getLastFmStats() {
    try {
        // Fetch user info and loved tracks in parallel
        const [userInfoResponse, weeklyTracksResponse, recentTracksResponse,allTimeArtistsResponse,allTimeTracksResponse,weeklyArtistsResponse] = await Promise.all([
            fetch(`${BASE_URL}?method=user.getinfo&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json`),
            fetch(`${BASE_URL}?method=user.gettoptracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json&period=7day&limit=10`),
            fetch(`${BASE_URL}?method=user.getRecentTracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json&limit=10`),
            fetch(`${BASE_URL}?method=user.getTopArtists&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json&period=overall&limit=10`),
            fetch(`${BASE_URL}?method=user.getTopTracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json&period=overall&limit=10`),
            fetch(`${BASE_URL}?method=user.getTopArtists&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json&period=7day&limit=10`)
        ]);

        const [userInfo, weeklyTopTracks, recentTracks, allTimeArtists, allTimeTopTracks, weeklyTopArtists] = await Promise.all([
            userInfoResponse.json(),
            weeklyTracksResponse.json(),
            recentTracksResponse.json(),
            allTimeArtistsResponse.json(),
            allTimeTracksResponse.json(),
            weeklyArtistsResponse.json()
        ]);


        // Calculate stats
        const totalScrobbles = parseInt(userInfo.user.playcount);
        const approximateMinutes = Math.round(totalScrobbles * 3.5); // Average 3.5 min/song
        const registered = new Date(userInfo.user.registered.unixtime * 1000);

        const enhancedWeeklyTopTracks = await Promise.all(
            (weeklyTopTracks.toptracks?.track || []).map(enhanceTrackData)
        );

        //Example of this API
        // "recenttracks": {
        //     "track": [
        //         {
        //             "artist": {
        //                 "mbid": "9a6273b2-72fa-47a4-a48b-073d6cbe037d",
        //                 "#text": "Rosa Walton"
        //             },
        const enhancedRecentTracks = await Promise.all(
            (recentTracks.recenttracks?.track || []).map(track => {
                const normalizedTrack = { ...track };
                if (typeof normalizedTrack.artist === 'object' && normalizedTrack.artist['#text']) {
                    normalizedTrack.artist = { name: normalizedTrack.artist['#text'] };
                }
                return enhanceTrackData(normalizedTrack);
            })
        );

        const enhancedAllTimeTopTracks = await Promise.all(
            (allTimeTopTracks.toptracks?.track || []).map(enhanceTrackData)
        );

        const enhancedWeeklyTopArtists = (weeklyTopArtists.topartists?.artist || []).map(enhanceArtistData);
        const enhancedAllTimeTopArtists = (allTimeArtists.topartists?.artist || []).map(enhanceArtistData);

        return {
            totalMinutes: approximateMinutes,
            totalScrobbles: totalScrobbles,
            registered: registered.toISOString(),
            weeklyTopTracks: enhancedWeeklyTopTracks,
            weeklyTopArtists: enhancedWeeklyTopArtists,
            recentTracks: enhancedRecentTracks,
            allTimeTopTracks: enhancedAllTimeTopTracks,
            allTimeTopArtists: enhancedAllTimeTopArtists
        };
    } catch (error) {
        console.error('Last.fm API error:', error);
        throw new Error('Failed to fetch Last.fm data');
    }
}
