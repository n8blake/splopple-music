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
            return { loading: true, songs: [] }
        case
            ACTIONS.GET_DATA:
            return { ...state, loading: false, songs: action.payload.songs }
        case
            ACTIONS.ERROR:
            return { ...state, loading: false, errors: action.payload.error, songs: [] }
        default:
            return state
    }
}

export default function useSearchAppleMusic(url) {
    console.log("::useSearchAppleMusic called::")
    const [state, dispatch] = useReducer(reducer, { songs: [], loading: true })

    useEffect(() => {
        dispatch({ type: ACTIONS.MAKE_REQUEST })
        axios.get(url, {
            headers: API.headers
        }).then(res => {
            console.log("::SEARCH REPONSE::")
            console.log(res.data.data[0].relationships.tracks.data)
            const resultArray = res.data.data[0].relationships.tracks.data.map(item => {
                return {
                    artistName: item.attributes.artistName,
                    songsTitle: item.attributes.name,
                    artwork: item.attributes.artwork,
                    preview: item.attributes.previews
                }
            })
            dispatch({ type: ACTIONS.GET_DATA, payload: { songs: resultArray } })
        }).catch(e => {
            if (axios.isCancel(e)) return
            dispatch({ type: ACTIONS.ERROR, payload: { error: e } })
        })
    }, [url])

    return state
}