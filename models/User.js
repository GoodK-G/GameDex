const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  // Instance method to check validity of password with user input
  async checkPassword(input) {
    const isValid = await bcrypt.compare(input, this.password);
    return isValid;
  };
};

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      // Passwords must be at least 8 characters
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      // Hash users' passwords when seeding
      async beforeBulkCreate(users) {
        for (let i = 0; i < users.length; i++) {
          users[i].password = await bcrypt.hash(users[i].password, 10);
        };
        return users;
      },
      async beforeCreate(user) {
        user.password = await bcrypt.hash(user.password, 10);
        return user;
      },
    },
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;