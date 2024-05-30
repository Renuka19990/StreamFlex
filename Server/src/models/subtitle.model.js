// backend/models/subtitleModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Subtitle = sequelize.define('Subtitle', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  language: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = {Subtitle};
