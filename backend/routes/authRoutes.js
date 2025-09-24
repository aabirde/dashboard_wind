const express = require('express');
const { body } = require('express-validator');
const { verifyEmail } = require('../controllers/authController');
const { registerValidationRules, validate } = require('../middleware/validation');

const router = express.Router();

const logRequestBody = (req, res, next) => {
  console.log('--- New Request Body Received by Backend ---');
  console.log(req.body);
  console.log('------------------------------------------');
  next();
};

const {register,login} = require('../controllers/authController');
const {validateRegister,validateLogin } = require('../middleware/validation');
router.post('/register',validateRegister, register);
router.post('/login',validateLogin, login);
router.get('/verify-email/:token', verifyEmail); 

module.exports = router;
