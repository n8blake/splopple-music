// Add any requires here
const spotifyAPIController = require ("./spotifyAPIController");
const playlistApi = "https://api.music.apple.com/v1/catalog/us/playlists/";
const axios = require('axios');

module.exports = { 
    fetchPlaylist: async function(request, response) {
        // the request will be a POST request from
        // the front end containing a playlist_uri

        console.log(request.body);
        let incomingPlaylistURI = "";
        const splitUrl = request.body.playlist_uri.split('/');
        for (let i = splitUrl.length - 1; i > 0; i--) {
            if (splitUrl[i] !== '') {
                incomingPlaylistURI = splitUrl[i];
                break;
            }
        }

        let playlistResponse = await axios.get(`${playlistApi}${incomingPlaylistURI}`, {
            headers: {
                Authorization: `Bearer ${process.env.APPLE_MUSIC_API_TOKEN}`
            }
        }).then(res => {
            return res.data;
        }).catch((err) => {
            response.status(404).json(err);
            return;
        });

        if (playlistResponse.errors) {
            response.status(404).send("Playlist not found");
        }
        let tracks = playlistResponse.data[0].relationships.tracks.data;
        let prunedTracks = [];
        for (let i = 0; i < tracks.length; i++) {
            let newTrack = {};
            let checkTrack = tracks[i];
            newTrack.trackName = checkTrack.attributes.name;
            newTrack.artists = [checkTrack.attributes.artistName];
            newTrack.album = checkTrack.attributes.albumName;
            newTrack.releaseDate = checkTrack.attributes.releaseDate;
            newTrack.appleTrackId = checkTrack.id;
            prunedTracks.push(newTrack);
        }
        let playlistStub = {
            applePlaylistURL: request.body.playlist_uri,
            spotifyPlaylistURL: "",
            playlistName: playlistResponse.data[0].attributes.name,
            playlistDesc: playlistResponse.data[0].attributes.description.standard,
            tracks: prunedTracks
        }
        let internalPlaylist = await spotifyAPIController.fetchTracks(playlistStub);
        response.json(internalPlaylist);
    }
}