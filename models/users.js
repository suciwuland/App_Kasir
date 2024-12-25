const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {  // Nama model 'User' tetap menggunakan kapital, tapi tabelnya menggunakan 'users'
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'users',  
    timestamps: false,   
}); 

module.exports = User;
