const axios = require('axios')

module.exports = {
    createPlaylist: async function (playlistData) {
        const playListName = playlistData.Name

        const appleTrackIDs = []
        // get apple track id for each ISRC
        // NOTE: it is possible to get multiple track Id for every ISRC
        //       in such case we will pick the first track. 
        //       (Need to figure out better logic in future)
        for (let i = 0; i < playlistData.TracksByISRC.length; i++) {
            const ISRC = playlistData.TracksByISRC[i]
            const queryUrl = `https://api.music.apple.com/v1/catalog/us/songs?filter[isrc]=${ISRC}`
            console.log("::QUERY URL::" + queryUrl)

            const response = await axios.get(queryUrl, {
                headers: {
                    Authorization: `Bearer ${process.env.APPLE_MUSIC_API_TOKEN}`
                }
            })

            console.log("::RESPONSE::")
            console.log(response.data.data)

            const appleTrackID = response.data.data[0].id
            appleTrackIDs.push(appleTrackID)
        }

        console.log("::AppleTrackIDs::")
        console.log(appleTrackIDs)

        const formattedAppleTrackIDs = appleTrackIDs.map(item => {
            return {
                id: `${item}`,
                type: "songs"
            }
        })

        // Apple music playlist create request body
        const playlistCreateRequest = {
            "attributes": {
                "name": `${playListName}`,
                "description": `${playListName}`
            },
            "relationships": {
                "tracks": {
                    "data": formattedAppleTrackIDs
                }
            }
        }

        console.log("::REQUEST BODY::")
        console.log(JSON.stringify(playlistCreateRequest))
        console.log(formattedAppleTrackIDs)

        const playlistCreateURL = "https://api.music.apple.com/v1/me/library/playlists"
        const createResponse = await axios.post(
            playlistCreateURL,
            JSON.stringify(playlistCreateRequest),
            {
                headers: {
                    Authorization: `Bearer ${process.env.APPLE_MUSIC_API_TOKEN}`
                }
            })
    }
}