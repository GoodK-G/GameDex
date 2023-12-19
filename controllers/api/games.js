const router = require("express").Router();
const { User, Game, Review, UserGames } = require("../../models");

router.get("/:gameID", async (req, res) => {
  try {
    const gameData = await Game.findByPk(req.params.gameID, {
      include: [
        {
          model: Review,
          attributes: ["id", "content", "rating", "createdAt"],
          include: [
            {
              model: User,
              attributes: ["id", "username"],
            },
          ],
        },
      ],
    });

    if (!gameData) {
      res.status(404).json({ message: "No game exists with this id!" });
      return;
    }

    res.json(gameData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const gameData = await Game.findOne({
      where: {
        id: req.body.game_id,
      },
    });

    if (!gameData) {
      res.status(404).json({ message: "No game found with this id!" });
      return;
    }

    const userGameData = await UserGames.create({
      user_id: req.session.user_id,
      game_id: req.body.game_id,
    });

    res.status(200).json(userGameData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/", async (req, res) => {
  try {
    const data = await UserGames.destroy({
      where: {
        user_id: req.session.user_id,
        game_id: req.body.game_id,
      },
    });

    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
