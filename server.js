const express = require("express");
const session = require('express-session');
const path = require("path");
const compression = require('compression');
const PORT = process.env.PORT || 3001;
const routes = require("./routes");
const app = express();

// set up database resources
// uncomment next line if we want to use mongo
//const mongoose = require("mongoose");
const sequelize = require('./config/sql_connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Configure session to handle persistant 
// server-side state 
const sessionConfig = {
	secret: process.env.SESSION_SECRET,
	cookie: {},
	resave: false,
	saveUninitialized: true,
	store: new SequelizeStore({
		db: sequelize
	})
};

// Define middleware here
app.use(compression());
app.use(session(sessionConfig));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Use routes
app.use(routes);

// Connect to the database...
// Connect to the Mongo DB
// uncomment below if we want to use mongo
// mongoose.connect(
//   process.env.MONGODB_URI || "mongodb://localhost/splopple"
// );

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => {
		console.log(`🌎 ==> API server now on port ${PORT}!`);
	});
});