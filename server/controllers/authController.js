const User = require('../models/User');

exports.signup = (req, res) => {
  const { name, email, password, role } = req.body;
  User.create({ name, email, password, role }, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'User registered', userId: result.insertId });
  });
};
