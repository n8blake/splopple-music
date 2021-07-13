import React from 'react'
import {Link} from "react-router-dom";
import Logo from '../logo/logo';

export default function Header() {
    return (
        <div className='text-center'>            
            <Logo />
            <div>
              <h1>Splopple Music</h1>
              <p>Giving the people what they want: Spotify and Apple Music Harmony.</p>
            </div>
            <nav>
            <ul className="nav navbar-light bg-light justify-content-center">
              <li className="nav-item m-2">
                <Link className='h4 text-secondary' to="/Login">Log in</Link>
              </li>
              <li className="nav-item m-2">
                <Link className='h4 text-secondary' to="/">Playlist</Link>
              </li>
              
            </ul>
        </nav>
        </div>
    )
}