    const User = require('../models/users');
    const bcrypt = require('bcrypt');
    const jwt = require('jsonwebtoken');

    exports.view_login = async (req, res) => {
        try {
        res.render('login', { User });
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
    };
    exports.users = async (req, res) => {
      try {
      res.render('users', { User });
      } catch (error) {
      res.status(500).json({ error: error.message });
      }
  };
    exports.getAllUsers = async (req, res) => {
      try {
          const users = await User.findAll();
          res.json(users);
      } catch (err) {
          res.status(500).json({ error: err.message });
      }
  };
    exports.register = async (req, res) => {
        const { username, password, role } = req.body;
        try {
            const user = await User.create({ username, password, role });
            res.json(user);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };
    exports.login = async (req, res) => {
      const { username, password } = req.body;
    
      try {
        const user = await User.findOne({ where: { username } });
    
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        // Langsung bandingkan password teks biasa
        if (user.password !== password) {
          return res.status(401).json({ error: 'Invalid password' });
        }
    
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        res.json({ token });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      }
    };
      
      