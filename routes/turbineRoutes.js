const express = require('express');
const { getAllTurbines, getTurbineById } = require('../controllers/turbineController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, getAllTurbines); // optionally protect with paywall
router.get('/:id', auth, getTurbineById);

module.exports = router;
