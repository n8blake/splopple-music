const SpotifyWebApi = require('spotify-web-api-node')

module.exports = {
    fetchPlaylist: async function (req, res) {
        // 1. Query spotify to get all the tracks in input playlist. 
        // 2. Create a new playlist in apple music with tracks found in step 1. 
        // 3. Create an internal playlist and return
        console.log("::Spotify fetchPlaylist called::")

        const incomingURL = new URL(req.body.playlist_uri)
        const playlistName = incomingURL.pathname.split('/').pop()
        console.log("::PlaylistName:: " + playlistName)

        const refresh= process.env.REFRESH_TOKEN
        const spotifyApi = new SpotifyWebApi({
            redirectUri: process.env.spotifyRedirectURI,
            clientId: process.env.SP_CI,
            clientSecret: process.env.SP_CS
        });

        spotifyApi.setRefreshToken(refresh)
        
        const accessTokenResponse = await spotifyApi.refreshAccessToken()        
        spotifyApi.setAccessToken(accessTokenResponse.body.access_token)        

        const playlistDetails = await spotifyApi.getPlaylist(playlistName)
        const tracksURL = playlistDetails.body.tracks.href
        console.log("::TRACKS URL:: " + tracksURL)

        const tracksResponse = await spotifyApi.getPlaylistTracks(playlistName)

        console.log(tracksResponse)

        return res.send(tracksResponse)
    }
}