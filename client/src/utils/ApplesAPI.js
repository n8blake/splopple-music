const fetchUrl = {
    method: "GET",
    //url: "https://api.music.apple.com/v1/catalog/us/playlists/pl.acc464c750b94302b8806e5fcbe56e17",
    url: "https://api.music.apple.com/v1/catalog/us/search?types=songs&term=",
    headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        "Content-Type": "application/json"
    }
};

export default fetchUrl;