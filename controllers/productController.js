const Product = require('../models/products');

exports.createProduct = async (req, res) => {
    const { name, price, stock } = req.body;
    try {
        const product = await Product.create({ name, price, stock });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getProductByCode = async (req, res) => {
    const { productCode } = req.params;
  
    try {
      const product = await Product.findOne({ where: { id: productCode } });
      if (!product) {
        return res.status(404).json({ message: 'Produk tidak ditemukan.' });
      }
  
      res.json({
        id: product.id,
        name: product.name,
        price: product.price,
      });
    } catch (error) {
      console.error('Error fetching product:', error.message);
      res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
    }
  };
exports.products = async (req, res) => {
    try {
    res.render('products', { Product });
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
};
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, stock } = req.body;
    try {
        const product = await Product.update({ name, price, stock }, { where: { id } });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await Product.destroy({ where: { id } });
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
