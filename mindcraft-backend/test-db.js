const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function testDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Try to create a test user
    const testUser = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'test123'
    };

    const user = await User.create(testUser);
    console.log('User created successfully:', user.name, user.email);

    // Try to find the user
    const foundUser = await User.findOne({ email: 'test@example.com' });
    console.log('User found in database:', foundUser.name);

    // Clean up - delete the test user
    await User.deleteOne({ email: 'test@example.com' });
    console.log('Test user cleaned up');

    console.log('✅ Database is working properly!');
  } catch (error) {
    console.error('❌ Database test failed:', error.message);
  } finally {
    await mongoose.connection.close();
  }
}

testDatabase();