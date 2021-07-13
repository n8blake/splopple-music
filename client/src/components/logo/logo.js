import React from 'react';
import LogoSVG from './logo.svg';
import './logo.scss';

function Logo() {
    //do logo stuff

    return (
        <img className="logo-default" alt="logo" src={LogoSVG}/>
    )

}

export default Logo;