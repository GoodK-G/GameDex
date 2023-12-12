// Import models
const User = require('./User');
const Game = require('./Game');
const Review = require('./Review');
const UserGames = require('./UserGames');

// Model associations
User.belongsToMany(Game, { through: UserGames });

Game.belongsToMany(User, { through: UserGames });

User.hasMany(Review, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Review.belongsTo(User);

Game.hasMany(Review, {
  foreignKey: 'game_id',
  onDelete: 'CASCADE',
});

Review.belongsTo(Game);

