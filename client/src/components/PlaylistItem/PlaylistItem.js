import React from 'react'
import './PlaylistItem.scss'

function PlaylistItem(props) {

    return (
        <li className="list-group-item playlist-item">
            <div className="d-flex justify-content-right">
                <div>
                    { props.data.errorMatch ? (
                       <span></span>
                    ) : (
                        <img className="album-art" alt="" src={props.data.images[0].url} /> 
                    )}
                    
                </div>
                <div className="track-data">
                    <strong>{props.data.trackName}</strong>
                    <p>{ props.data.artists ? (
                        props.data.artists.map((artist, index) => {
                            return (<span key={index} className="artist">{artist}</span>)
                        })
                    ) : (<span></span>)}
                    </p>
                    {
                    props.data.errorMatch ? (
                        <p className="error-message"><i className="bi bi-exclamation-triangle-fill"></i> This track was unable to be matched by the server and was not added to the converted playlist.</p>
                    ) : ( 
                        <p className="success-message">
                            <i className="bi bi-check-circle-fill"></i> Added to converted playlist.
                        </p>
                     )
                    }
                </div>
                
            </div>
        </li>
    )
}

export default PlaylistItem;