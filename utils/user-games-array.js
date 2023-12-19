const { User, Game, UserGames } = require('../models');

const createUserGamesArray = async (user_id) => {
  const userData = await User.findOne({
    where: {
        id: user_id
    },
    include: [{
        model: Game,
        attributes: ['id'],
        through: {
            attributes: []
        }
    }]
  });

  let userGames = []
  if (userData.games.length) {
      userGames = userData.games.map((game) => game.id);
  };

  return userGames;
};

module.exports = createUserGamesArray;