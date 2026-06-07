const mongoose = require('mongoose');

const HabitLogSchema = new mongoose.Schema({
  habitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habit',
    required: true
  },
  date: {
    type: String, // Store as YYYY-MM-DD
    required: true
  },
  completed: {
    type: Boolean,
    default: true
  }
});

// Ensure a habit can only have one log entry per date
HabitLogSchema.index({ habitId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('HabitLog', HabitLogSchema);
