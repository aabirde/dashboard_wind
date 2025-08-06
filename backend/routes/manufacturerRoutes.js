const express = require('express');
const { getCumulativeStats, getTurbineSpecificStats, getUserSpecificStats } = require('../controllers/manufacturerController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/cumulative-stats', auth, getCumulativeStats);
router.get('/turbine-stats', auth, getTurbineSpecificStats);
router.get('/user-stats', auth, getUserSpecificStats);

module.exports = router;