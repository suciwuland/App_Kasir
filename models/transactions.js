const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./users');
const Product = require('./products');

const Transaction = sequelize.define('Transaction', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'id',
        },
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total_price: {
        type: DataTypes.NUMERIC,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,  // Mengatur default value sebagai waktu saat ini
    },
}, {
    tableName: 'transactions',  
    timestamps: false,  // Kita set timestamps ke false, tapi menambahkan field created_at secara manual
});

module.exports = Transaction;
