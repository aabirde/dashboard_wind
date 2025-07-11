const express = require('express');
const { getReports, createReport } = require('../controllers/reportController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, getReports);
router.post('/', auth, createReport);

module.exports = router;
