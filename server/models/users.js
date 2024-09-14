const { DataTypes } = require('sequelize');
const { sequelize } = require('./connection');

const User = sequelize.define(
  'user',
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    read_posts: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  { timestamps: false }
);

module.exports = User;
