import React from 'react'
import {Link} from "react-router-dom";
import Logo from '../logo/logo';

export default function Header() {
    return (
        <div class='text-center'>            
            <Logo />
            <div>
              <h1>Splopple Music</h1>
              <p>Giving the people what they want: Spotify and Apple Music Harmony.</p>
            </div>
            <nav>
            <ul class="nav navbar-light bg-light justify-content-center">
              <li class="nav-item m-2">
                <Link class='h4 text-secondary' to="/Login">Log in</Link>
              </li>
              <li class="nav-item m-2">
                <Link class='h4 text-secondary' to="/Playlist">Playlist</Link>
              </li>
              
            </ul>
        </nav>
        </div>
    )
}