const SpotifyWebApi = require('spotify-web-api-node')


module.exports = { 
    

    fetchTracks: async function (newTrack){
        let tracks=[]
        let playlistId=''
        let done= false
        let playlistUrl=''
        
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
            token=data.body.token_type
            spotifyAPI.setAccessToken(data.body.access_token)

            spotifyAPI.createPlaylist('Name', {'description': 'Insert Description', 'public': true})
                    .then((data)=>{
                        console.log('Playlist Created')
                        console.log(data)
                        playlistId= data.body.id
                        playlistUrl=data.body.external_urls.spotify
                        
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
                                                        images: dataSet[0].album.images,
                                                        url: playlistUrl
                                                        
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