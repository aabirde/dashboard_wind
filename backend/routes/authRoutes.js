const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const { register, login } = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../middleware/validation');
router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

module.exports = router;
