const HabitLog = require('../models/HabitLog');
const Habit = require('../models/Habit');

// @desc    Get dashboard summary statistics
// @route   GET /api/analytics/summary
// @access  Private
const getSummary = async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.user.id });
    const habitIds = habits.map(h => h._id);

    const logs = await HabitLog.find({ habitId: { $in: habitIds } });

    const totalHabits = habits.length;

    // Calculate total logs
    const completedLogs = logs.filter(log => log.completed);
    const totalLogs = completedLogs.length;

    // Group completed logs by date
    const logsByDate = {};
    completedLogs.forEach(log => {
      if (!logsByDate[log.date]) {
        logsByDate[log.date] = 0;
      }
      logsByDate[log.date]++;
    });

    // Calculate perfect days (days where completed count >= totalHabits)
    let perfectDays = 0;
    if (totalHabits > 0) {
      Object.values(logsByDate).forEach(count => {
        if (count >= totalHabits) perfectDays++;
      });
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const completedToday = logsByDate[todayStr] || 0;

    // Calculate Current Streak
    let currentStreak = 0;
    let checkDate = new Date();
    
    // Streak logic: check starting from today. If today has 0, check yesterday. If yesterday has 0, streak is 0.
    let dateStr = checkDate.toISOString().split('T')[0];
    if (!logsByDate[dateStr]) {
      checkDate.setDate(checkDate.getDate() - 1);
      dateStr = checkDate.toISOString().split('T')[0];
    }
    
    while (logsByDate[dateStr]) {
      currentStreak++;
      checkDate.setDate(checkDate.getDate() - 1);
      dateStr = checkDate.toISOString().split('T')[0];
    }

    // Calculate Weekly Data for the last 7 days
    const weeklyData = [];
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dStr = d.toISOString().split('T')[0];
      const dayName = daysOfWeek[d.getDay()];
      
      weeklyData.push({
        name: dayName,
        completed: logsByDate[dStr] || 0,
        total: totalHabits
      });
    }

    res.status(200).json({
      totalHabits,
      completedToday,
      activeHabits: totalHabits,
      completionRate: totalHabits ? Math.round((completedToday / totalHabits) * 100) : 0,
      totalLogs,
      perfectDays,
      currentStreak,
      weeklyData
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSummary
};
