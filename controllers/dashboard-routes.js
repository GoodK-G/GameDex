const router = require('express').Router();
const { User, Game, Review } = require('../models');

router.get('/', async (req, res) => {
  try {
    const gameData = await User.findOne({
      where: {
        id: req.session.userID,
      },
      attributes: ['id', 'username'],
      include: [{
        model: Game,
        attributes: ['id', 'name', 'platform'],
        through: {
          attributes: [],
        }
      }],
    });

    res.json(gameData);    
  } catch (err) {
    res.status(500).json(err);
  };
});

router.get('/game/:gameID', async (req, res) => {
  try {

  } catch (err) {

  }
})

module.exports = router;