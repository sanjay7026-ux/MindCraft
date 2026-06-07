require('dotenv').config();
const mongoose = require('mongoose');
const { getSummary } = require('./controllers/analyticsController');

async function testAnalytics() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to DB');

  // Mock req and res
  const req = { user: { id: '65cf12345678901234567890' } }; // Random ID, might return 0
  const res = {
    status: function(code) {
      this.statusCode = code;
      return this;
    },
    json: function(data) {
      console.log('Status:', this.statusCode);
      console.log('Analytics Summary:\n', JSON.stringify(data, null, 2));
    }
  };

  await getSummary(req, res);
  
  mongoose.connection.close();
}

testAnalytics();
