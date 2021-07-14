import React, { useEffect, useState } from 'react'
import ItemInformation from '../ItemInformation/ItemInformation'
import './PlaylistItem.scss'

function PlaylistItem(props) {
    
    const [conflict, setConflic] = useState(false);
    const [listItemClass, setListItemClass] = useState("list-group-item playlist-item")

    useEffect(()=>{
        if(props.data.conflict) {
            setListItemClass("list-group-item playlist-item conflict")
        }
    }, [props.data.conflict])

    return (
        <li className={listItemClass}>
            {props.data.conflict ? (
                // conflic action component
                <div>
                <div className="conflict-action-container">
                    <div className="badge rounded-pill bg-danger conflict-notification">Conflict!</div>
                    <p className="text-danger">Select one of the songs to resolve.</p>
                </div>
                <ul className="list-group-flush conflict-list">
                    
                    {props.data.songs.map((song, index) => {
                        return(
                            <ItemInformation conflict={true} key={index} item={song} />
                        )
                    })}
                </ul>
                </div>
            ) : (
                <ul className="list-group-flush conflict-list">
                {props.data.songs.map((song, index) => {
                    return(
                        <ItemInformation conflict={false} key={index} item={song} />
                    )
                })}
                </ul>
            )}

        </li>
    )
}

export default PlaylistItem;