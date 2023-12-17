const router = require('express').Router();
const { User, Game } = require('../../models');
require('dotenv').config();
//create a new user
router.post('/create', async(req,res) => {
    try{
        const userData = await User.create(req.body);
        req.session.save(() =>{
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            req.session.user_games = [];
            res.status(200).json(userData);
        });
    }
    catch(err){
        res.status(400).json(err);
    }
});


//login route

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                username: req.body.username
            },
            include: [{
                model: Game,
                attributes: ['id'],
                through: {
                    attributes: []
                }
            }]
        });

        if (!userData){
            res
                .status(400)
                .json({ message: 'Incorrect username or password, please try again'});
            return;
        }
    

    const validatePassword = await userData.checkPassword(req.body.password);
    if (!validatePassword) {
        res
            .status(400)
            .json({ message: 'Incorrect username or password, please try again'});
        return;
    }

    // Map the user's games to later store in session variable
    let userGames = []
    if (userData.games.length) {
        userGames = userData.games.map((game) => game.id);
    };

    req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        req.session.user_games = userGames;
        
        res.json({ user: userData, message: 'You have successfully logged in!'})
    });
   } catch (err) {
     res.status(400).json(err);
    }
});

// logout route
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
          res.status(204).end();
        });
      } else { 
        res.status(404).end();
    }
});
module.exports = router;
