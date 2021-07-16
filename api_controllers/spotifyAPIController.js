const SpotifyWebApi = require('spotify-web-api-node')


module.exports = { 
    constructor(){
        this.token;
        this.token_type;
        this.trackArr=[];
        this.playlistId
        this.playlist.url;
        
    },

    fetchTracks: async function (newTrack){
        let tracks=[]
        let playlistId=''
        let done= false
        
        const refresh= process.env.REFRESH_TOKEN
        const spotifyAPI= new SpotifyWebApi({
            redirectUri: 'http://localhost:3000/',
            clientId: process.env.SP_CI,
            clientSecret:process.env.SP_CS
        })
        spotifyAPI.setRefreshToken(refresh)
        const getData= new Promise((resolve, rej)=>{
        spotifyAPI.refreshAccessToken()
        .then((data)=>{
            
            this.token=data.body.access_token
            this.token_type=data.body.token_type
            token=data.body.token_type
            spotifyAPI.setAccessToken(data.body.access_token)

            spotifyAPI.createPlaylist('T9', {'description': 'Insert Description', 'public': true})
                    .then((data)=>{
                        console.log('Playlist Created')
                        playlistId= data.body.id
                        
                            const makePlaylist=async()=>{

                                for (let i=0;i<newTrack.length;i++){
                                    
                                    console.log(i)
                                    if(i===newTrack.length-1){
                                        console.log(true)
                                        done=true
                                        resolve(tracks)
                                        return(tracks)
                                    }
                                    if(!done){
                                        console.log(false)
                                    }
                                   const noParseTrack=newTrack[i].trackName;
                                   const noParseArt=newTrack[i].artists[0]
                                    const paresTrack=noParseTrack.replace(/'/g, '',/&/g, '	%26' )
                                    const paresArt=noParseArt.replace(/'/g, '',/&/g, '	%26' )
                                const data=await spotifyAPI.searchTracks(`track:${paresTrack} artist: ${paresArt}`)
                                        
                                        
                                        const dataSet=data.body.tracks.items   
                                                    const track={
                                                        artist: newTrack[i].artists[0],
                                                        trackName:dataSet[0].name,
                                                        spotifyId: dataSet[0].id,
                                                        images: dataSet[0].album.images
                                                    }
                                                
                                                    tracks.push(track)
                                                   
                                                    spotifyAPI.addTracksToPlaylist(playlistId, [`spotify:track:${track.spotifyId}`])
                                                    .then((data)=>{
                                                        console.log(`track ${track.trackName}added`)
                                                       
                                                    })
    
                                } 

                            }
                        makePlaylist()

                      
                    })
    
        })
    })
        return getData
       
    }
}