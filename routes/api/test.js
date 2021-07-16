const router = require("express").Router();
const mockBackendAPIController = require("../../api_controllers/mockBackendAPIController");

// Match with '/api/test'
router.route("/")
    .post(mockBackendAPIController.fetchPlaylist);

module.exports = router;