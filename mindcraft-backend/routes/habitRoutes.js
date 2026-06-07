const express = require('express');
const router = express.Router();
const {
  getHabits,
  createHabit,
  updateHabit,
  deleteHabit,
  logHabit,
  getHabitLogs
} = require('../controllers/habitController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getHabits).post(protect, createHabit);
router.route('/logs').get(protect, getHabitLogs);
router.route('/:id').put(protect, updateHabit).delete(protect, deleteHabit);
router.route('/:id/log').post(protect, logHabit);

module.exports = router;
