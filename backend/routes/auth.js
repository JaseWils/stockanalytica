const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { getPublicKey, decryptPassword } = require('../utils/rsaUtils');

// Get RSA Public Key for client-side encryption
router.get('/public-key', (req, res) => {
  try {
    const publicKey = getPublicKey();
    console.log('Public key requested and served');
    res.json({ publicKey });
  } catch (error) {
    console.error('Error getting public key:', error);
    res.status(500).json({ error: 'Failed to get public key' });
  }
});

// Register with RSA encrypted password
router.post('/register', async (req, res) => {
  try {
    const { email, encryptedPassword, name, profileType } = req.body;

    console.log('=== REGISTER ATTEMPT ===');
    console.log('Email:', email);

    if (!email || !encryptedPassword || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }

    // Decrypt the RSA encrypted password
    let password;
    try {
      password = decryptPassword(encryptedPassword);
      console.log('Password decrypted successfully, length:', password. length);
    } catch (decryptError) {
      console.error('Decryption failed:', decryptError.message);
      return res. status(400).json({ error: 'Invalid encrypted password.  Please refresh the page and try again.' });
    }

    // Validate password strength
    if (! password || password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email:  email. toLowerCase().trim() });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Create new user - password will be hashed by the pre-save hook
    const user = new User({ 
      email: email.toLowerCase().trim(), 
      password, 
      name:  name.trim(), 
      profileType: profileType || 'diversified' 
    });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    console.log('User registered successfully:', email);

    res.status(201).json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        profileType: user.profileType,
        balance: user.balance
      },
      token
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Login with RSA encrypted password
router.post('/login', async (req, res) => {
  try {
    const { email, encryptedPassword } = req.body;

    console. log('=== LOGIN ATTEMPT ===');
    console.log('Email:', email);

    if (!email || !encryptedPassword) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Decrypt the RSA encrypted password
    let password;
    try {
      password = decryptPassword(encryptedPassword);
      console.log('Password decrypted successfully, length:', password.length);
    } catch (decryptError) {
      console.error('Decryption failed:', decryptError.message);
      return res.status(400).json({ error: 'Invalid encrypted password.  Please refresh the page and try again.' });
    }

    // Find user by email (case-insensitive)
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      console.log('User not found:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await user. comparePassword(password);
    console.log('Password comparison result:', isMatch);
    
    if (! isMatch) {
      console.log('Password mismatch for user:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    console.log('User logged in successfully:', email);

    res.json({
      user:  {
        id:  user._id,
        email: user. email,
        name: user.name,
        profileType:  user.profileType,
        balance: user.balance
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    res.json({
      user: {
        id: req.user._id,
        email: req.user. email,
        name: req.user. name,
        profileType: req.user.profileType,
        balance: req. user.balance
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete user (for testing/development)
router.delete('/user/:email', async (req, res) => {
  try {
    const { email } = req. params;
    const result = await User.deleteOne({ email: email.toLowerCase().trim() });
    if (result.deletedCount === 0) {
      return res. status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res. status(500).json({ error: error. message });
  }
});

// Reset all users (for testing/development only)
router.delete('/reset-users', async (req, res) => {
  try {
    const result = await User. deleteMany({});
    res.json({ message: `Deleted ${result.deletedCount} users` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;