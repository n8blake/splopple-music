import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { useStoreContext } from "../../utils/GlobalState";
import Logo from '../logo/logo';
import './Header.scss';

export default function Header() {

    const [showSpinner, setShowSpinner] = useState(false);
    const [state, dispatch] = useStoreContext();

    useEffect(() => {
      if(state.loading){
        setShowSpinner(true);
      } else {
        setShowSpinner(false);
      }
    }, [state.loading])

    const showNav = false;



    return (
        <div className='text-center'>            
            <div className="d-flex justify-content-center">
              <Logo spin={showSpinner} />
            </div>
            {
              ((state.inputListResults && state.inputListResults.tracks) || state.loading) ? (
                <div>
                  
                </div>
              ) : (
                <div>
                  <h1>Splopple Music</h1>
                  <p>Giving the people what they want: Spotify and Apple Music Harmony.</p>
                </div>
              )
            }
            {
              showSpinner ? (
                <div>Loading...</div>
              ) : (
                <div></div>
              )
            }
            { showNav ? (
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
            ) : (
              <span></span>
            )}
        </div>
    )
}