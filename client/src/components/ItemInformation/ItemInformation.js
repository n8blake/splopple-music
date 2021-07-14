import React, { useEffect, useState } from 'react'
import './ItemInformation.scss';

function ItemInformation(props) {
    const [listItemInfoClass, setListItemInfoClass] = useState("list-group-item information-item")

    useEffect(()=>{
        if(props.conflict) {
            setListItemInfoClass("list-group-item information-item conflict d-flex justify-content-between")
        }
    }, [props.conflict])

    return(
        <li className={listItemInfoClass}>
            <div className="d-flex justify-content-right">
                <div>
                    <img className="album-art" alt="" src={props.item.albumArt} /> 
                </div>
                <div>
                    <strong>{props.item.title}</strong>
                    <p>{props.item.artist}</p>
                </div>
            </div>
            {props.conflict ? (
                <div>√</div>
            ) : (
                <span></span>
            )}
        </li>
    )
}

export default ItemInformation;