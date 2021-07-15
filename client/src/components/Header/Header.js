import React from 'react'
import { Link } from "react-router-dom";
import Logo from '../logo/logo';
import './Header.scss';

export default function Header() {

    return (
        <div className='text-center'>            
            <Logo />
            <div>
              <h1>Splopple Music</h1>
              <p>Giving the people what they want: Spotify and Apple Music Harmony.</p>
            </div>
            <nav>
            <ul className="nav justify-content-center">
              <li className="nav-item m-2">
                <Link to="/Login">Log in</Link>
              </li>
              <li className="nav-item m-2">
                <Link to="/">Playlist</Link>
              </li>
              
            </ul>
        </nav>
        </div>
    )
}