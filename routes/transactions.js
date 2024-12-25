const express = require('express');
const { createTransaction, transactions } = require('../controllers/transactionController');
const router = express.Router();

router.post('/add', createTransaction);
router.get('/', transactions);
module.exports = router;
