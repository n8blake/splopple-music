const router = require("express").Router();
const spotifyAPIController = require("../../api_controllers/spotifyAPIController");

// Match with '/api/spotify'
router.route("/")
    //.get(bookController.findAll)
    .post(spotifyAPIController.fetchTracks);

// Matches with '/api/spotify/:id'
// Is this even useful?
// router.route("/:id")
//     .get(spotifyAPIController.getById)
//     .put(spotifyAPIController.update)
//     .delete(spotifyAPIController.delete)

module.exports = router;