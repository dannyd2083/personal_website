export async function GET() {
    const scope = "user-top-read user-read-recently-played";
    const query = new URLSearchParams({
        client_id: process.env.SPOTIFY_CLIENT_ID,
        response_type: "code",
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        scope
    });

    return Response.redirect(`https://accounts.spotify.com/authorize?${query}`, 302);
}
