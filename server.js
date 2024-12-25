const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const sequelize = require('./db'); 
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views')); 

app.use(express.urlencoded({ extended: true })); 
// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes untuk API
app.use('/users', require('./routes/users'));
app.use('/products', require('./routes/products')); 
app.use('/transactions', require('./routes/transactions'));
app.use('/reports', require('./routes/reports'));

app.get('/dashboard', async (req, res) => {
    res.render('dashboard');
  });
app.get('/', async (req, res) => {
    res.redirect('/users'); 
  });

// Test DB connection   
sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.error('Error:', err));

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
