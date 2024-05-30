// backend/models/recommendationModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Recommendation = sequelize.define('Recommendation', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  contentId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  score: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = {Recommendation};
