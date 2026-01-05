const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose. Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim:  true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  profileType: {
    type: String,
    enum: ['focused', 'diversified'],
    default: 'diversified'
  },
  balance: {
    type: Number,
    default: 50000
  },
  createdAt: {
    type: Date,
    default:  Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  // Only hash if password is modified or new
  if (! this.isModified('password')) {
    return next();
  }
  
  try {
    // Generate salt and hash
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    if (!candidatePassword || ! this.password) {
      return false;
    }
    return await bcrypt. compare(candidatePassword, this.password);
  } catch (error) {
    console.error('Password comparison error:', error);
    return false;
  }
};

module.exports = mongoose. model('User', userSchema);