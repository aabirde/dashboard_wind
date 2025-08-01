const express = require('express');
const { getAllUsers, getUserById } = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, getAllUsers);
router.get('/:id', auth, getUserById);

module.exports = router;
