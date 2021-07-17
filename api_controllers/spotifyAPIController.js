const SpotifyWebApi = require('spotify-web-api-node')


module.exports = { 
    

    fetchTracks: async function (playlistData){
        let internalPlaylist = playlistData;
        let internalTracks = internalPlaylist.tracks;
        // let tracks=[]
        let playlistId=''
        let done= false
        let playlistUrl=''
        
        const refresh= process.env.REFRESH_TOKEN
        const spotifyAPI= new SpotifyWebApi({
            redirectUri: process.env.spotifyRedirectURI,
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
                        // console.log(data)
                        playlistId= data.body.id
                        internalPlaylist.spotifyPlaylistURL=data.body.external_urls.spotify
                        
                            const makePlaylist=async()=>{

                                for (let i=0;i<internalTracks.length;i++){
                                    
                                    const noParseTrack=internalTracks[i].trackName;
                                    const noParseArt=internalTracks[i].artists[0]
                                    const paresTrack=noParseTrack.replace(/'/g, '',/&/g, '	%26' )
                                    const paresArt=noParseArt.replace(/'/g, '',/&/g, '	%26' )
                                    const data=await spotifyAPI.searchTracks(`track:${paresTrack} artist: ${paresArt}`)
                                        
                                    const dataSet=data.body.tracks.items;   
                                    internalPlaylist.tracks[i].spotifyTrackId = dataSet[0].id;
                                    internalPlaylist.tracks[i].images = dataSet[0].album.images;
                                    const track={
                                        artist: internalTracks[i].artists[0],
                                        trackName:dataSet[0].name,
                                        spotifyId: dataSet[0].id,
                                        images: dataSet[0].album.images,
                                        url: playlistUrl
                                        
                                    }
                                
                                    // tracks.push(track)
                                    
                                    spotifyAPI.addTracksToPlaylist(playlistId, [`spotify:track:${track.spotifyId}`])
                                    .then((data)=>{
                                        console.log(`track ${track.trackName}added`)
                                        
                                    })
                                    // console.log(i)
                                    if(i===internalTracks.length-1){
                                        console.log(true)
                                        done=true
                                        resolve(internalPlaylist)
                                        return(internalPlaylist)
                                    }
                                    if(!done){
                                        console.log(false)
                                    }
                                } 
                            }
                        makePlaylist()

                      
                    })
    
        })
    })
        return getData
       
    }
}