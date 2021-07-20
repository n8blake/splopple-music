const router = require("express").Router();
const appleRoutes = require("./apple");
const spotifyRoutes = require("./spotify");
const testRoute = require("./test");

// routes
router.use("/apple", appleRoutes);
router.use("/spotify", spotifyRoutes);
router.use("/test", testRoute);

module.exports = router;