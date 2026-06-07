const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true 
  },
  password: { 
    type: String, 
    required: true 
  }
}, { timestamps: true });

// Mongoose 9.x: pre-save hooks no longer use the `next` callback.
// Simply return or throw — no `next()` needed.
UserSchema.pre('save', function() {
  if (!this.isModified('password')) {
    return;
  }
  this.password = bcrypt.hashSync(this.password, 10);
});

UserSchema.methods.matchPassword = function(enteredPassword) {
  return bcrypt.compareSync(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);