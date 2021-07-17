import React, {useState} from 'react'
import useFetchplaylists from './useFetchPlaylist'
//import GetSpotifyToken from './GetSpotifyToken'
import Song from "./components/Song"
import useSearchAppleMusic from "./useSearchAppleMusic"

export default function App() {
    const [artistName, setArtistName] = useState("Louis Jordan")
    const [songName, setSongName] = useState("caldonia")
    const { playlists, loading, error } = useFetchplaylists(artistName, songName)
    //const {token, tokenLoading, tokenError} = GetSpotifyToken()
    //console.log("token: ", token)

    const [searchURL, setSearchURL] = useState("https://api.music.apple.com/v1/catalog/us/playlists/pl.acc464c750b94302b8806e5fcbe56e17")    
    const { songs, songsLoading, songsError } = useSearchAppleMusic(searchURL)
    console.log("::APPLE MUSIC SEARCH::")
    console.log(songs)

    return (
        <div>
            <h1>Search results from Apple Music</h1>
            <div>
                {loading && <h1>Loading...</h1>}
                {error && <h1>Error...</h1>}                
                                
                {playlists.map(item => {                    
                    return <Song key={item.id} song={item} />
                })}
            </div>
      </div>
    )
}
