const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

const champion = sequelize.define('champion', {
        championname: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },{
        tableName: 'champion',
        timestamps: true,  
});

module.exports = champion;
