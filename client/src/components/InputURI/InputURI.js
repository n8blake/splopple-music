import React, { useEffect, useState } from 'react';
import { useStoreContext } from "../../utils/GlobalState";
import './InputURI.scss';

function InputURI(props) {

    const [inputWrapperClass, setInputWrapperClass] = useState('');
    //const [state, dispatch] = useStoreContext();

    useEffect(() => {

        console.log('source change');
        console.log(props.playlistSource);
        setInputWrapperClass("input-wrapper " + props.playlistSource + "-input-url");

    }, [props.playlistSource])

    return (
        <div className={inputWrapperClass}>
            <input onChange={props.onChange} className=" " type="text" name="inputURI" placeholder="Playlist URL" />
        </div>
    )

}

export default InputURI;