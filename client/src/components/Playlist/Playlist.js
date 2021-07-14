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
        //const uri = event.target.value;
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

        if(debouncedInputURI){
            // set global search term
            dispatch({
                type: QUERY_APPLE_URI,
                URI: debouncedInputURI
            });
            //console.log(`Starting search...`);
            API.queryAppleMusicURI(state.listURI)
                .then(results => {
                    //console.log("Queried!");
                    //console.log(results.status);
                    if(results.data){
                        dispatch({
                            type: UPDATE_LIST_RESULTS,
                            results: results.data
                        });
                    }
                    
                });

        }
    }, [debouncedInputURI, dispatch, listURI, state.inputListResults, state.listURI]);

    return (
        <div className="container">
            <InputURI onChange={handleInputChange} />
            <ul className="list-group playlist">
                {
                    state.inputListResults ? (
                        state.inputListResults.map((listItem, index) => {
                            return(
                                <PlaylistItem key={index} data={listItem} />
                            )
                        })
                    ) : (
                        <li className="list-group-item">
                            <small className="text-muted">no results</small>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}
