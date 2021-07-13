/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

export default {
    // Get all employees
    queryAppleMusicURI: function(URI){ 
        //console.log(`Getting ${queryString}`)
        const appleMusicEndPoint = '/api/AppleMusic/';
        return axios.post(appleMusicEndPoint, URI);
    },
    querySpotifyURI: function(URI){ 
        //console.log(`Getting ${queryString}`)
        const spotifyEndPoint = '/api/Spotify/';
        return axios.post(spotifyEndPoint, URI);
    }
};