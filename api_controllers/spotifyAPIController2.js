const SpotifyWebApi = require('spotify-web-api-node')
const appleMusicAPIController2 = require("./appleMusicAPIController2")

module.exports = {
    fetchPlaylist: async function (req, res) {
        // 1. Query spotify to get all the tracks in input playlist. 
        // 2. Create a new playlist in apple music with tracks found in step 1. 
        // 3. Create an internal playlist and return
        console.log("::Spotify fetchPlaylist called::")

        const incomingURL = new URL(req.body.playlist_uri)
        const playlistName = incomingURL.pathname.split('/').pop()
        console.log("::PlaylistName:: " + playlistName)

        const refresh = process.env.REFRESH_TOKEN
        const spotifyApi = new SpotifyWebApi({
            redirectUri: process.env.spotifyRedirectURI,
            clientId: process.env.SP_CI,
            clientSecret: process.env.SP_CS
        });

        spotifyApi.setRefreshToken(refresh)

        const accessTokenResponse = await spotifyApi.refreshAccessToken()
        spotifyApi.setAccessToken(accessTokenResponse.body.access_token)

        const playlistDetails = await spotifyApi.getPlaylist(playlistName)                

        const tracksResponse = await spotifyApi.getPlaylistTracks(playlistName)
        const trackISRCs = tracksResponse.body.items.map(item => {
            return item.track.external_ids.isrc
        })

        const playlistData = {
            'Name': playlistDetails.body.name,
            'TracksByISRC': trackISRCs
        }

        console.log(playlistData)

        const createResponse = await appleMusicAPIController2.createPlaylist(playlistData)
        return res.status(createResponse.status).send(createResponse.data.data)
    }
}