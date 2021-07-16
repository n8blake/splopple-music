const SpotifyWebApi = require('spotify-web-api-node')

module.exports = { 
    constructor(){
        this.token;
        this.token_type;
        this.trackArr=[];
        this.playlistId
        this.playlist.url;
        
    },

    fetchTracks(newTrack){
        
        const refresh= process.env.REFRESH_TOKEN
        const spotifyAPI= new SpotifyWebApi({
            redirectUri: 'http://localhost:3000/',
            clientId: process.env.SP_CI,
            clientSecret:process.env.SP_CS
        })
        spotifyAPI.setRefreshToken(refresh)
        spotifyAPI.refreshAccessToken()
        .then((data)=>{
            this.token=data.body.access_token
            this.token_type=data.body.token_type
            spotifyAPI.setAccessToken=data.body.access_token

            spotifyAPI.createPlaylist('Name', {'description': 'Insert Description', 'public': true})
                    .then((data)=>{
                        console.log('Playlist Created')
                        this.playlistId= data.body.id
                    })

            for (let i=0;i<newTrack.lenght;i++){
                spotifyAPI.searchTracks(`track:${newTrack[i].trackName} artist: ${newTrack[i].artist[0]}`)
                .then((data)=>{
                    const dataSet=data.tracks
                    const track={
                        artist: dataSet.items[0].artists[0].name,
                        trackName:dataSet.items[0].name,
                        spotifyId: dataSet.items[0].id,
                        images: dataSet.items[0].album.images
                    }
                    this.trackArr.push(track)
                    spotifyAPI.addTracksToPlaylist(this.playlistId, [`spotify:track:${dataSet.items[0].id}`])
                    .then((data)=>{
                        console.log('track added')
                    })
                })
            } 
            
        })
    }
}