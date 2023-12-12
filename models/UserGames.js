const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserGames extends Model {};

// Initialize UserGames junction model
UserGames.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    game_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'game',
        key: 'id',
      },
    },
    owned: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    wishlist: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'user_games',
  }
);

module.exports = UserGames;