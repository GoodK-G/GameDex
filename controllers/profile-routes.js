const router = require('express').Router();
const { User, Game, Review } = require('../models');
const withAuth = require('../utils/auth');

// Get route for user profile
router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        id: req.session.user_id,
      },
      attributes: ['id', 'username'],
      include: [{
        model: Game,
        attributes: ['id', 'name', 'cover', 'release_date', 'url', 'igdb_rating', 'summary'],
        through: {
          attributes: [],
        }
      }],
    });

    const games = userData.games.map((game) => game.get({ plain: true }));

    res.render('user-profile', { games, loggedIn: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  };
});

// Get route for individual game belonging to user through their profile
router.get('/games/:gameID', withAuth, async (req, res) => {
  try {
    const gameData = await Game.findByPk(req.params.gameID);

    res.json(gameData);
  } catch (err) {
    res.status(500).json(err)
  };
})

module.exports = router;