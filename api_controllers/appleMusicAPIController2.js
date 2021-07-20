const axios = require('axios')
const { restart } = require('nodemon')

module.exports = {
    createPlaylist: async function (workingData) {
        const applePlaylistName = workingData.playlistName

        const appleTrackIds = []
        // get apple track id for each ISRC
        // NOTE: it is possible to get multiple track Id for every ISRC
        //       in such case we will pick the first track. 
        //       (Need to figure out better logic in future)
        for (let i = 0; i < workingData.tracks.length; i++) {
            const currentItem = workingData.tracks[i]
            const ISRC = currentItem.isrc
            const queryUrl = `https://api.music.apple.com/v1/catalog/us/songs?filter[isrc]=${ISRC}`
            // console.log("::QUERY URL::" + queryUrl)

            const response = await axios.get(queryUrl, {
                headers: {
                    Authorization: `Bearer ${process.env.APPLE_MUSIC_API_TOKEN}`
                }
            })

            // console.log("::RESPONSE::")
            // console.log(response.data.data)
            if (response.data != null && response.data.data != null && response.data.data.length > 0) {
                const appleTrackId = response.data.data[0].id
                currentItem.appleTrackId = appleTrackId
                // console.log("::CURRENT TRACK::")
                // console.log(currentItem)
            } else {
                currentItem.errorMatch = true
                console.log(`No record found for ISRC ${ISRC}`)
            }
        }

        // console.log("::AppleTrackIDs::")
        // console.log(appleTrackIDs)

        const formattedAppleTrackIDs = workingData.tracks
            .filter(item => {
                if (item.errorMatch === true) {
                    return false
                }
                return true
            })
            .map(item => {
                return {
                    id: `${item.appleTrackId}`,
                    type: 'song'
                }
            })

        // Apple music playlist create request body
        const playlistCreateRequest = {
            "attributes": {
                "name": `${applePlaylistName}`,
                "description": `${applePlaylistName}`
            },
            "relationships": {
                "tracks": {
                    "data": formattedAppleTrackIDs
                }
            }
        }

        console.log("::REQUEST BODY - APPLE CREATE::")
        console.log(JSON.stringify(playlistCreateRequest))
        console.log(formattedAppleTrackIDs)        

        const playlistCreateURL = "https://api.music.apple.com/v1/me/library/playlists"
        const payload = JSON.stringify(playlistCreateRequest)
        const headers = {
            Authorization: `Bearer ${process.env.APPLE_MUSIC_API_TOKEN}`,
            "Music-User-Token": `${process.env.APPLE_MUSIC_API_USER_TOKEN}`
        }

        //console.log("::CREATE REQUEST::")
        // console.log(playlistCreateURL)
        // console.log(payload)
        // console.log(headers)

        const createResponse = await axios.post(playlistCreateURL, payload, { headers: headers })

        console.log(createResponse)

        const playlistUrl = `https://music.apple.com/library/playlist/${createResponse.data.data[0].id}`
        workingData.appleMusicPlaylistURI = playlistUrl    
        
        console.log("::DEBUG:: Apple playlist created")
        console.log(workingData)

        return createResponse
    }
}