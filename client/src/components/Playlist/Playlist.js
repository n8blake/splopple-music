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
    const [playlistError, setPlaylistError] = useState(false);
    const [playlistSource, setPlaylistSource] = useState("");
    const debouncedInputURI = useDebounce(listURI, 500);

    const handleInputChange = event => {
        setListURI(event.target.value);
    }

    const queryAppleMusic = () => {
        setPlaylistSource('apple');
        //console.log(debouncedInputURI);

        dispatch({
            type: QUERY_APPLE_URI,
            URI: debouncedInputURI
        });

        //console.log(`Starting search...`);
        //console.log(state.inputURI);
        API.queryAppleMusicURI(debouncedInputURI)
            .then(results => {
                //console.log("Queried!");
                console.log(results.status);
                if(results.data){
                    console.log(results.data);
                    dispatch({
                        type: UPDATE_LIST_RESULTS,
                        results: results.data
                    });
                    dispatch({
                        type: LOADING,
                        loading: false
                    });
                }
            })
            .catch(error => {
                setPlaylistError(true);
                console.log(error);
                dispatch({
                    type: LOADING,
                    loading: false
                });
            });
    }

    const querySpotify = () => {
        setPlaylistSource('spotify');

        dispatch({
            type: QUERY_SPOTIFY_URI,
            URI: debouncedInputURI
        });

        //console.log(`Starting search...`);
        API.querySpotifyURI(debouncedInputURI)
            .then(results => {
                //console.log("Queried!");
                //console.log(results.status);
                if(results.data){
                    console.log(results.data);
                    dispatch({
                        type: UPDATE_LIST_RESULTS,
                        results: results.data
                    });
                    dispatch({
                        type: LOADING,
                        loading: false
                    });
                }
            })
            .catch(error => {
                setPlaylistError(true);
                console.log(error);
                dispatch({
                    type: LOADING,
                    loading: false
                });
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
            setPlaylistError(false);
            return;
        }

        if(debouncedInputURI && (debouncedInputURI !== state.inputURI)){
            
            // "validate" URI here...
            const appleMusicURLPrefix = 'https://music.apple.com/us/playlist/';
            const appleMusicLibraryURLPrefix = 'https://music.apple.com/library/playlist/';
            const spotifyURLPrefix = 'https://open.spotify.com/playlist/';
            //console.log(debouncedInputURI.indexOf(appleMusicURLPrefix) === 0);
            // is it Apple Music or Spotify?
            console.log(debouncedInputURI);
            dispatch({
                type: LOADING,
                loading: true
            });
            if(debouncedInputURI.indexOf(appleMusicURLPrefix) === 0 || 
            debouncedInputURI.indexOf(appleMusicLibraryURLPrefix)){
                queryAppleMusic();
            } else if(debouncedInputURI.indexOf(spotifyURLPrefix) === 0){
                querySpotify();
            } else {
                dispatch({
                    type: LOADING,
                    loading: false
                });
                setPlaylistError(true);
                return;
            }

        }
    }, [debouncedInputURI, dispatch, listURI, state.inputListResults, state.inputURI]);

    return (
        <div className="container playlist-container">
            
            <InputURI playlistSource={playlistSource} onChange={handleInputChange} />
            <div className="">
            {
                (state.inputListResults && state.inputListResults.playlistName) ? (
                    <h3><i className="bi bi-music-note-list"></i> {state.inputListResults.playlistName}</h3>
                ) : (
                    <div></div>
                )
            }
            {
                (state.inputListResults && state.inputListResults.playlistDesc) ? (
                    <p>{state.inputListResults.playlistDesc}</p>
                ) : (
                    <div></div>
                )
            }
            </div>
            {
                (state.inputListResults && state.inputListResults.spotifyPlaylistURL && (playlistSource !== 'spotify')) ? 
                ( 
                    <a href={state.inputListResults.spotifyPlaylistURL} target="_blank" rel="noopener noreferrer" className="btn btn-lg btn-outline-success destination-uri-button">Open In Spotify</a>
                ) : (
                    <span></span>
                )
            }
            {
                (state.inputListResults && state.inputListResults.appleMusicPlaylistURL && (playlistSource !== 'apple')) ? 
                ( 
                    <a href={state.inputListResults.appleMusicPlaylistURL} target="_blank" rel="noopener noreferrer" className="btn btn-lg btn-outline-info destination-uri-button">Open In Apple Music</a>
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
                        playlistError ? ( 
                            <i className="text-danger no-results">URL provided was not recognized by the server. Please enter a valid playlist URL.</i>
                        ) : (
                            <i className="text-muted no-results">Enter an Apple Music or Spotify playlist URL.</i>  
                        )
                    )
                }
            </ul>
            
        </div>
    )
}
