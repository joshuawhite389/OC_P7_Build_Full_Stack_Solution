const { DataTypes } = require('sequelize');
const { sequelize } = require('./connection');

const Posts = sequelize.define(
  'posts',
  {
    post_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    title : {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    content : {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.TEXT,
    },
  },
  { timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' }
);

module.exports = Posts;
