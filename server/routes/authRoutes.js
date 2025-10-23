const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController'); // import login

router.post('/signup', signup);
router.post('/login', login); // <-- add this

module.exports = router;
