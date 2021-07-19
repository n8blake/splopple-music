import React, { useEffect } from 'react';
import LogoSVG from './logo.svg';
import LogoBG from './logo-bg.svg';
import musicNote from './music-note-white.svg';
import soundLines from './sound-lines-white.svg';
import './logo.scss';

function Logo(props) {

    useEffect(() => {

    }, [props.spin])

    return (
        props.spin ? (
            <div className="logo-spinning-container">
                <img className="logo-spinning-bg" alt="logo" src={LogoBG}/>
                <div className="music-note-container">
                    <img className="music-note-spinning" alt="music note" src={musicNote} />
                </div>
                <div className="sound-lines-container">
                    <img className="sound-lines-spinning" alt="sound lines" src={soundLines} />
                </div>
            </div>
        ) : (
            <img className="logo-default" alt="logo" src={LogoSVG}/>
        )
    )

}

export default Logo;