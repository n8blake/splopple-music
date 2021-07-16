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
    const [playlistSource, setPlaylistSource] = useState("");
    const debouncedInputURI = useDebounce(listURI, 500);

    const handleInputChange = event => {
        setListURI(event.target.value);
    }

    const queryAppleMusic = () => {
        setPlaylistSource('apple');

        dispatch({
            type: QUERY_APPLE_URI,
            URI: debouncedInputURI
        });

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

    const querySpotify = () => {
        setPlaylistSource('spotify');

        dispatch({
            type: QUERY_SPOTIFY_URI,
            URI: debouncedInputURI
        });

        //console.log(`Starting search...`);
        API.querySpotifyURI(state.inputURI)
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
            setPlaylistSource('');
            return;
        }

        if(debouncedInputURI && (debouncedInputURI !== state.inputURI)){
            
            // "validate" URI here...
            const appleMusicURLPrefix = 'https://music.apple.com/us/playlist/';
            const spotifyURLPrefix = 'https://open.spotify.com/playlist/';
            //console.log(debouncedInputURI.indexOf(appleMusicURLPrefix) === 0);
            // is it Apple Music or Spotify?
            if(debouncedInputURI.indexOf(appleMusicURLPrefix) === 0){
                queryAppleMusic();
            } else if(debouncedInputURI.indexOf(spotifyURLPrefix) === 0){
                querySpotify();
            } else {
                return;
            }

        }
    }, [debouncedInputURI, dispatch, listURI, state.inputListResults, state.inputURI]);

    return (
        <div className="container playlist-container">
            
            <InputURI playlistSource={playlistSource} onChange={handleInputChange} />
            {
                (state.inputListResults && state.inputListResults.spotifyPlaylistURI && (playlistSource !== 'spotify')) ? 
                ( 
                    <a href={state.inputListResults.spotifyPlaylistURI} target="_blank" className="btn btn-lg btn-outline-success destination-uri-button">Open In Spotify</a>
                ) : (
                    <span></span>
                )
            }
            {
                (state.inputListResults && state.inputListResults.appleMusicPlaylistURI && (playlistSource !== 'apple')) ? 
                ( 
                    <a href={state.inputListResults.appleMusicPlaylistURI} target="_blank" className="btn btn-lg btn-outline-info destination-uri-button">Open In Apple Music</a>
                ) : (
                    <span></span>
                )
            }
            <ul className="list-group playlist">
                {
                    (state.inputListResults && state.inputListResults.tracks) ? (
                        state.inputListResults.tracks.map((listItem, index) => {
                            return(
                                <PlaylistItem key={index} data={listItem} />
                            )
                        })
                    ) : (
                        <i className="text-muted no-results">Enter an Apple Music or Spotify playlist URL.</i>  
                    )
                }
            </ul>
            
        </div>
    )
}
