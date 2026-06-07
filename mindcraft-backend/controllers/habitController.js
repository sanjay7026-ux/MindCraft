const Habit = require('../models/Habit');
const HabitLog = require('../models/HabitLog');

// @desc    Get user habits
// @route   GET /api/habits
// @access  Private
const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.user.id });
    res.status(200).json(habits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create habit
// @route   POST /api/habits
// @access  Private
const createHabit = async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({ message: 'Please add a text field' });
    }

    const habit = await Habit.create({
      title: req.body.title,
      frequency: req.body.frequency || 'daily',
      userId: req.user.id
    });

    res.status(201).json(habit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update habit
// @route   PUT /api/habits/:id
// @access  Private
const updateHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    if (habit.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    const updatedHabit = await Habit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedHabit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete habit
// @route   DELETE /api/habits/:id
// @access  Private
const deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    if (habit.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await habit.deleteOne();
    // Also delete logs
    await HabitLog.deleteMany({ habitId: req.params.id });

    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Log habit completion
// @route   POST /api/habits/:id/log
// @access  Private
const logHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit || habit.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized or habit missing' });
    }

    const { date, completed } = req.body;
    let log = await HabitLog.findOne({ habitId: req.params.id, date });

    if (log) {
      log.completed = completed;
      await log.save();
    } else {
      log = await HabitLog.create({
        habitId: req.params.id,
        date,
        completed
      });
    }

    res.status(200).json(log);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get habit logs for a specific date range or all
// @route   GET /api/habits/logs
// @access  Private
const getHabitLogs = async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.user.id }).select('_id');
    const habitIds = habits.map(h => h._id);

    const logs = await HabitLog.find({ habitId: { $in: habitIds } });
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getHabits,
  createHabit,
  updateHabit,
  deleteHabit,
  logHabit,
  getHabitLogs
};
