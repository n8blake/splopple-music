import React from 'react'
import {Link} from "react-router-dom";
import Logo from './logo/logo';

export default function Header() {
    return (
        <div class='text-center'>            
            <Logo />
            <nav>
            <ul class="nav navbar-light bg-light justify-content-center">
              <li class="nav-item m-2">
                <Link class='h4 text-secondary' to="/">Home</Link>
              </li>
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