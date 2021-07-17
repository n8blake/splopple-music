/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

export default {
    // Get all employees
    queryAppleMusicURI: function(URI){ 
        //console.log(`Getting ${URI}`)
        const appleMusicEndPoint = '/api/apple/';
        const testEndPoint = '/api/test/';
        const request = {
            playlist_uri: URI
        }
        console.log(request);
        // if(process.env.NODE_ENV === "production"){
        //     return axios.post(appleMusicEndPoint, request);
        // } 
        // return axios.post(testEndPoint, request);
        return axios.post(appleMusicEndPoint, request);
    },
    querySpotifyURI: function(URI){ 
        //console.log(`Getting ${queryString}`)
        const spotifyEndPoint = '/api/Spotify/';
        const testEndPoint = '/api/test/';
        const request = {
            playlist_uri: URI
        }
        if(process.env.NODE_ENV === "production"){
            return axios.post(spotifyEndPoint, URI);
        } 
        return axios.post(testEndPoint, request);
    }
};