const Transaction = require('../models/transactions');
const Product = require('../models/products');

// Menghubungkan model Transaction dengan Product melalui relasi
Transaction.belongsTo(Product, { foreignKey: 'product_id' });  // Set hubungan antara transaksi dan produk

const getReports = async (req, res) => {
  const { start_date, end_date } = req.query;

  try {
    // Ambil data laporan dengan filter tanggal dan join dengan tabel Product
    const reports = await Transaction.findAll({
      include: [
        {
          model: Product,
          attributes: ['product_name', 'price'],  // Ambil atribut produk yang diperlukan
        },
      ],
      where: {
        created_at: {
          [Op.between]: [start_date, end_date],  // Filter berdasarkan tanggal
        },
      },
      attributes: [
        'transaction_id',
        'created_at',
        'product_id',
        'quantity',
        'total_price', // Hitung total harga
        'status',
      ],
    });

    // Format hasil laporan dan kirimkan sebagai JSON
    const formattedReports = reports.map(report => ({
      transaction_id: report.transaction_id,
      created_at: report.created_at,
      product_id: report.product_id,
      product_name: report.Product.product_name,  // Nama produk dari tabel Product
      quantity: report.quantity,
      price: report.Product.price,  // Harga produk dari tabel Product
      total_price: report.dataValues.total_price, // Total harga yang dihitung
      status: report.status,
    }));

    res.json(formattedReports);

  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('Internal Server Error');
  }
};
  