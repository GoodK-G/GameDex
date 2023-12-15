const routes = require('express').Router();
const loginRoutes = require('./login');
const userRoutes = require('./User');

//This is the route that will be used for the login.
routes.use('/login', loginRoutes);
routes.use('/user', userRoutes);


module.exports = routes;