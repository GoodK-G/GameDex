// Import JSON with seed data
const userSeedData = require('./userSeedData.json');
const gameSeedData = require('./gameSeedData.json');
const reviewSeedData = require('./reviewSeedData.json');
const userGameSeedData = require('./userGameSeedData.json');

// Import models
const { User, Game, Review, UserGames } = require('../models');

// Import sequelize conneciton to sync
const sequelize = require('../config/connection')

// Function to seed all tables
const seedAll = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userSeedData);

  await Game.bulkCreate(gameSeedData);

  await Review.bulkCreate(reviewSeedData);

  await UserGames.bulkCreate(userGameSeedData);

  process.exit();
};

seedAll();