const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.config');
 // Ensure this points to your Sequelize database connection file

const Blacklist = sequelize.define('Blacklist', {
    token: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // Sequelize specific settings
    timestamps: false, // Disable timestamps if not needed
    versionKey: false, // No version key
    tableName: 'blacklists' // Optional: explicitly define table name
});

module.exports = { Blacklist };
