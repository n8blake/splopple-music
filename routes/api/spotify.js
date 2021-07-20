const router = require("express").Router();
const spotifyAPIController = require("../../api_controllers/spotifyAPIController");
const spotifyAPIController2 = require("../../api_controllers/spotifyAPIController2")

// Match with '/api/spotify'
router.route("/")
    //.get(bookController.findAll)
    //.post(spotifyAPIController.fetchTracks);
    .post(spotifyAPIController2.fetchPlaylist);

// router.route("/fetchPlaylist")
//     .post(spotifyAPIController2.fetchPlaylist);
    

// Matches with '/api/spotify/:id'
// Is this even useful?
// router.route("/:id")
//     .get(spotifyAPIController.getById)
//     .put(spotifyAPIController.update)
//     .delete(spotifyAPIController.delete)

module.exports = router;