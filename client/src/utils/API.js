/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

export default {
    // Get all employees
    queryAppleMusicURI: function(URI){ 
        //console.log(`Getting ${queryString}`)
        const appleMusicEndPoint = '/api/AppleMusic/';
        //return axios.post(appleMusicEndPoint, URI);
        //{artist: 'Lady Gaga', title: 'Bad Romance', time:'', albumArt:'https://upload.wikimedia.org/wikipedia/en/c/cc/Lady_Gaga_-_Bad_Romance.png'},
        //{artist: 'Beyoncé', song: 'All the Single Ladies'},
        //{artist: 'Shakira', song: 'Hips don\'t Lie'}
        const testData = [
            {
                songs:[
                    { 
                        artist: 'Lady Gaga', 
                        title: 'Bad Romance', 
                        time:'4:24',
                        released: '2010', 
                        explicit: false,
                        album: 'Bad Romance Single',
                        albumArt:'https://upload.wikimedia.org/wikipedia/en/c/cc/Lady_Gaga_-_Bad_Romance.png'
                    },
                    { 
                        artist: 'Lady Gaga', 
                        title: 'Bad Romance', 
                        time:'4:55',
                        released: '2009', 
                        explicit: true,
                        album: 'The Fame Monster',
                        albumArt:'https://images-na.ssl-images-amazon.com/images/I/71Pu0evk6eL._SL1095_.jpg'
                    },
                ],
                conflict: true,
            },
            {
                songs:[
                    { 
                        artist: 'Beyoncé', 
                        title: 'Single Ladies (Put a Ring On It)', 
                        time:'3:13',
                        released: '2008', 
                        explicit: false,
                        album: 'I Am... Sasha Fierce',
                        albumArt:'https://upload.wikimedia.org/wikipedia/en/9/96/I_Am..._Sasha_Fierce.png'
                    }
                ],
                conflict: false,
            },
            {
                songs:[
                    { 
                        artist: 'Shakira', 
                        title: 'Hips Don\'t Lie (feat. Wyclef Jean)', 
                        time:'3:38',
                        released: '2005', 
                        explicit: false,
                        album: 'Oral Fixation, Vol. 2',
                        albumArt:'https://images-na.ssl-images-amazon.com/images/I/71zZNCwkGNL._SL1500_.jpg'
                    }
                ],
                conflict: false,
            },
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