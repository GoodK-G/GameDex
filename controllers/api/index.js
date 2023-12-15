const routes = require('express').Router();
const userRoutes = require('./login');

//This is the route that will be used for the login.
routes.use('/', userRoutes);


module.exports = routes;