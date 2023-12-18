const router = require('express').Router();
const { Game, UserGames } = require('../../models');



router.post('/addGame', async (req, res) => {
    try {
        const gameData = await Game.findOne({
            where: {
                id: req.body.game_id,
            },
        });

        if (!gameData) {
            res.status(404).json({ message: 'No game found with this id!' });
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

exports.router = router;