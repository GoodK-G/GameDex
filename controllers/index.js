const router = require('express').Router();

// Import routes
const homeRoutes = require('./home-routes');
const dashboardRoutes = require('./dashboard-routes');
const loginRoutes = require('./api/login')
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', loginRoutes);
module.exports = router;