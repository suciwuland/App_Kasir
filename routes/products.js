const express = require('express');
const { createProduct, getAllProducts, updateProduct, getProductByCode,deleteProduct, products } = require('../controllers/productController');
const router = express.Router();

router.post('/add', createProduct);
router.get('/view', getAllProducts);
router.get('/', products);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.get('/:productCode', getProductByCode);

module.exports = router;
