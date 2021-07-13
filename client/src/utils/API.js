/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

export default {
    // Get all employees
    queryAppleMusicURI: function(URI){ 
        //console.log(`Getting ${queryString}`)
        const appleMusicEndPoint = '/api/AppleMusic/';
        //return axios.post(appleMusicEndPoint, URI);
        const testData = [
            {artist: 'Lady Gaga', song: 'Bad Romance'},
            {artist: 'Beyoncé', song: 'All the Single Ladies'},
            {artist: 'Shakira', song: 'Hips don\'t Lie'}
        ]
        const testPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
              const response = {};
              response.data = testData;
              response.status = 'ok';
              response.code = 200;
              //console.log('responding...');
              resolve(response);
            }, 500);
          });
        return testPromise;
    },
    querySpotifyURI: function(URI){ 
        //console.log(`Getting ${queryString}`)
        const spotifyEndPoint = '/api/Spotify/';
        return axios.post(spotifyEndPoint, URI);
    }
};