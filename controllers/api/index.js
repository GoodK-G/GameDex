const routes = require("express").Router();
const userRoutes = require("./login");
const reviewRoutes = require("./reviews");
const gamesRoutes = require("./remove-game", "./add-game");

//This is the route that will be used for the login.
routes.use("/", userRoutes);
routes.use("/reviews", reviewRoutes);
routes.use("/games", gamesRoutes);

module.exports = routes;
