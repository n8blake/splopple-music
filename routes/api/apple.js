const router = require("express").Router();
const appleMusicAPIController = require("../../api_controllers/appleMusicAPIController");

// Match with '/api/apple'
router.route("/")
    //.get(bookController.findAll)
    .post(appleMusicAPIController.fetch);

// Matches with '/api/apple/:id'
// Is this even useful?
// router.route("/:id")
//     .get(appleMusicAPIController.getById)
//     .put(appleMusicAPIController.update)
//     .delete(appleMusicAPIController.delete)

module.exports = router;