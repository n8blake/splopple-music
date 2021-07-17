import { useEffect, useReducer } from "react"
import axios from "axios"
import API from "./utils/ApplesAPI";

const ACTIONS = {
    MAKE_REQUEST: 'make-request',
    GET_DATA: 'get-data',
    ERROR: 'error'
}

//action is varable and state is current state
function reducer(state, action) {
    switch (action.type) {
        case
            ACTIONS.MAKE_REQUEST:
            return { loading: true, playlists: [] }
        case
            ACTIONS.GET_DATA:
            return { ...state, loading: false, playlists: action.payload.playlists }
        case
            ACTIONS.ERROR:
            return { ...state, loading: false, errors: action.payload.error, playlists: [] }
        default:
            return state
    }
}

//Every time change in parmas or anything we have to reload page to repopulate by use of use effect hook.
export default function useFetchplaylists(artistName, songName) {
    //console.log("Fetch playlists called.")    
    const [state, dispatch] = useReducer(reducer, { playlists: [], loading: true })    

    useEffect(() => {       
        dispatch({ type: ACTIONS.MAKE_REQUEST })                
        //console.log("Artist Name: " + artistName)
        //console.log("Song Name: " + songName)
        const searchTerm = `${encodeURIComponent(artistName)}+${encodeURIComponent(songName)}`
        //const encodedTerm = encodeURIComponent(searchTerm)
        const searchApi = API.url + searchTerm
        //console.log("Search URL: " + searchApi)
        axios.get(searchApi, {
            headers: API.headers
        }).then(res => {
            //console.log("::RES::")
            //console.log(res)
            //console.log("::res.data.results.songs.data::")
            //console.log(res.data.results.songs.data)
            dispatch({ type: ACTIONS.GET_DATA, payload: { playlists: res.data.results.songs.data } })
        }).catch(e => {
            if (axios.isCancel(e)) return
            dispatch({ type: ACTIONS.ERROR, payload: { error: e } })
        })
        
    }, [artistName, songName])
    return state
}
