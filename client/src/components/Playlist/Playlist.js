import React, { useEffect, useState } from 'react';
import PlaylistItem from '../PlaylistItem/PlaylistItem';
import InputURI from '../InputURI/InputURI';
import { useStoreContext } from "../../utils/GlobalState";
import useDebounce from "../../utils/DebounceHook";
import { QUERY_APPLE_URI, UPDATE_LIST_RESULTS, QUERY_SPOTIFY_URI, LOADING } from '../../utils/actions';
import API from "../../utils/API";
import './Playlist.scss';

export default function Playlist() {

    const [state, dispatch] = useStoreContext();
    const [listURI, setListURI] = useState("");
    const debouncedInputURI = useDebounce(listURI, 500);

    const handleInputChange = event => {
        setListURI(event.target.value);
    }

    useEffect(() => {
        // if there is nothing searched...
        if(!listURI){
            dispatch({
                type: QUERY_APPLE_URI,
                inputURI: ""
            });
            dispatch({
                type: UPDATE_LIST_RESULTS,
                searchResults: state.inputListResults
            });
            return;
        }

        if(debouncedInputURI && (debouncedInputURI != state.inputURI)){
            // set global search term
            dispatch({
                type: QUERY_APPLE_URI,
                URI: debouncedInputURI
            });

            //validate URI here...

            //console.log(`Starting search...`);
            API.queryAppleMusicURI(state.inputURI)
                .then(results => {
                    //console.log("Queried!");
                    //console.log(results.status);
                    if(results.data){
                        //console.log(results.data);
                        dispatch({
                            type: UPDATE_LIST_RESULTS,
                            results: results.data
                        });
                    }
                });

        }
    }, [debouncedInputURI, dispatch, listURI, state.inputListResults, state.inputURI]);

    return (
        <div className="container playlist-container">
            <InputURI onChange={handleInputChange} />
            <ul className="list-group playlist">
                {
                    (state.inputListResults && state.inputListResults.tracks) ? (
                        state.inputListResults.tracks.map((listItem, index) => {
                            return(
                                <PlaylistItem key={index} data={listItem} />
                            )
                        })
                    ) : (
                        <i className="text-muted no-results">no results</i>  
                    )
                }
            </ul>
            {
                (state.inputListResults && state.inputListResults.spotifyPlaylistURI) ? 
                ( 
                    <a href={state.inputListResults.spotifyPlaylistURI} target="_blank" className="btn btn-lg btn-outline-success spotify-uri-button">Open In Spotify</a>
                ) : (
                    <span></span>
                )
            }
            {
                (state.inputListResults && state.inputListResults.appleMusicPlaylistURI) ? 
                ( 
                    <a href={state.inputListResults.appleMusicPlaylistURI} target="_blank" className="btn btn-lg btn-outline-info spotify-uri-button">Open In Apple Music</a>
                ) : (
                    <span></span>
                )
            }
        </div>
    )
}
