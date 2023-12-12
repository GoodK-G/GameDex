const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Review extends Model {};

// Initialize Review model
Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // Restrict rating on 1 to 10 scale
      validate: {
        max: 10,
        min: 1,
      },
    },
    game_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'game',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'review',
  },
);

module.exports = Review;