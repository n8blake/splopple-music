import React from 'react';
import './InputURI.scss';

function InputURI(props) {
    //do stuff

    return (
        <div className="input-wrapper">
            <input onChange={props.onChange} className=" " type="text" name="inputURI" placeholder="Playlist URI" />
        </div>
    )

}

export default InputURI;