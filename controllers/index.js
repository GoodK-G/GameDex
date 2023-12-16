const router = require('express').Router();

// Import routes
const homeRoutes = require('./home-routes');
const profileRoutes = require('./profile-routes');
const apiRoutes = require('./api');

router.use('/', homeRoutes);
router.use('/profile', profileRoutes);
router.use('/api', apiRoutes);

module.exports = router;