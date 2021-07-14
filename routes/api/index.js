const router = require("express").Router();
const appleRoutes = require("./apple");
const spotifyRoutes = require("./spotify");

// routes
router.use("/apple", appleRoutes);
router.use("/spotify", spotifyRoutes);

module.exports = router;