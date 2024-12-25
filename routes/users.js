const express = require('express');
const { register, login, view_login,users, getAllUsers } = require('../controllers/userController');
const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.get('/view', users);
router.get('/view-users', getAllUsers);
router.get('/', view_login);

module.exports = router;
    