import React from 'react'
import './PlaylistItem.scss'

function PlaylistItem(props) {

    return (
        <li className="list-group-item playlist-item">
            <div className="d-flex justify-content-right">
                <div>
                    <img className="album-art" alt="" src={""} /> 
                </div>
                <div>
                    <strong>{props.data.trackName}</strong>
                    <p>{""}</p>
                </div>
            </div>
        </li>
    )
}

export default PlaylistItem;