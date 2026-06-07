const express = require('express');
const router = express.Router();
const { lookupNutrition } = require('../controllers/nutritionController');
const { protect } = require('../middleware/authMiddleware');

router.post('/lookup', protect, lookupNutrition);

module.exports = router;
