const express = require('express');
const { register, login } = require('../controllers/authController');
const { body } = require('express-validator');
const inputValidator = require('../middleware/inputvalidator');

const router = express.Router();

router.post('/register', [
  body('username').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], inputValidator, register);

router.post('/login', [
  body('email').isEmail(),
  body('password').notEmpty()
], inputValidator, login);

module.exports = router;
