import React from 'react'
import './PlaylistItem.scss'

function PlaylistItem(props) {

    return (
        <li className="list-group-item playlist-item">
            <div className="d-flex justify-content-right">
                <div>
                    <img className="album-art" alt="" src={props.data.images[0].url} /> 
                </div>
                <div className="track-data">
                    <strong>{props.data.trackName}</strong>
                    <p>{ props.data.artists ? (
                        props.data.artists.map((artist, index) => {
                            return (<span key={index} className="artist">{artist}</span>)
                        })
                    ) : (<span></span>)}</p>
                </div>
            </div>
        </li>
    )
}

export default PlaylistItem;