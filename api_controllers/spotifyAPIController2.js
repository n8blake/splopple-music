const SpotifyWebApi = require('spotify-web-api-node')
const appleMusicAPIController2 = require("./appleMusicAPIController2")
//const {Playlist} = require("../models")

module.exports = {
    fetchPlaylist: async function (req, res) {
        // 1. Query spotify to get all the tracks in input playlist. 
        // 2. Create a new playlist in apple music with tracks found in step 1. 
        // 3. Create an internal playlist and return
        console.log("::Spotify fetchPlaylist called::")

        const workingData = {
            appleMusicPlaylistURI: '',
            spotifyPlaylistURI: '',
            playlistName: '',
            tracks: []
        }

        if(req.body.playlist_uri === undefined) {
            return res.status(400).send({
                error: "Request body doesn't contain playlist url."
            })
        }
        
        workingData.spotifyPlaylistURI = new URL(req.body.playlist_uri)
        const spotifyPlaylistId = workingData.spotifyPlaylistURI.pathname.split('/').pop()        
        //console.log("::DEBUG:: Spotify playlist name: " + spotifyPlaylistId)

        const refresh = process.env.REFRESH_TOKEN
        const spotifyApi = new SpotifyWebApi({
            redirectUri: process.env.spotifyRedirectURI,
            clientId: process.env.SP_CI,
            clientSecret: process.env.SP_CS
        });

        spotifyApi.setRefreshToken(refresh)

        const accessTokenResponse = await spotifyApi.refreshAccessToken()
        spotifyApi.setAccessToken(accessTokenResponse.body.access_token)

        const playlistDetails = await spotifyApi.getPlaylist(spotifyPlaylistId)

        // TODO: handle error
        //       It is possible that no playlist is found. 
        workingData.playlistName = playlistDetails.body.name        

        const trackDetails = await spotifyApi.getPlaylistTracks(spotifyPlaylistId)
        for(let i=0; i<trackDetails.body.items.length; i++ ){
            const currentItem = trackDetails.body.items[i]
            const currentTrackDetail = {
                artists: currentItem.track.artists.map(item =>{
                    return item.name
                }),
                trackName: currentItem.track.name,
                releaseDate: currentItem.track.album.release_date,
                album: currentItem.track.album.name,
                images: currentItem.track.album.images,
                appleTrackId: '',
                spotifyTrackId: currentItem.track.id,
                isrc: currentItem.track.external_ids.isrc,                
                errorMatch: false
            }            

            workingData.tracks.push(currentTrackDetail)
        }
        
        console.log("::DEBUG:: WorkingData")
        console.log(workingData)                

        const createResponse = await appleMusicAPIController2.createPlaylist(workingData)
        const applePlaylistUrl = `https://music.apple.com/library/playlist/${createResponse.data.data[0].id}`
        console.log("::Playlist url:: " + applePlaylistUrl.toString());

        workingData.appleMusicPlaylistURI = applePlaylistUrl

        return res.status(createResponse.status).send(createResponse.data.data)
    }
}