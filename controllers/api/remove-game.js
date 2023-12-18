const router = require('express').Router();
const { UserGames } = require('../../models');

// Remove game from user library
router.delete('/', async (req, res) => {
  try {
    const data = await UserGames.destroy({
      where: {
        user_id: req.body.user_id,
        game_id: req.body.game_id
      }
    });

    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  };
});

module.exports = router;