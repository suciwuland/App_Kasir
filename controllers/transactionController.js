const Transaction = require('../models/transactions');
const Product = require('../models/products');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const doc = new PDFDocument();
exports.transactions = async (req, res) => {
    try {
    res.render('transactions', { Transaction });
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
};
exports.createTransaction = async (req, res) => {
    const { user_id, product_id, quantity } = req.body;
    try {
        const product = await Product.findByPk(product_id);
        if (!product || product.stock < quantity) {
            return res.status(400).json({ error: 'Insufficient stock or product not found' });
        }

        const total_price = product.price * quantity;
        const transaction = await Transaction.create({ user_id, product_id, quantity, total_price });

        // Update product stock
        await Product.update({ stock: product.stock - quantity }, { where: { id: product_id } });

        res.json(transaction);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
