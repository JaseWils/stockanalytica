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
    console.log('Public key requested');
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

    console.log('Register attempt for:', email);

    // Decrypt the RSA encrypted password
    let password;
    try {
      password = decryptPassword(encryptedPassword);
      console.log('Password decrypted successfully');
    } catch (decryptError) {
      console.error('Decryption failed:', decryptError. message);
      return res.status(400).json({ error: 'Invalid encrypted password' });
    }

    // Validate password strength
    if (! password || password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res. status(400).json({ error: 'Email already registered' });
    }

    const user = new User({ email, password, name, profileType });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn:  '7d'
    });

    console.log('User registered successfully:', email);

    res.status(201).json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        profileType: user.profileType,
        balance:  user.balance
      },
      token
    });
  } catch (error) {
    console. error('Register error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Login with RSA encrypted password
router.post('/login', async (req, res) => {
  try {
    const { email, encryptedPassword } = req.body;

    console.log('Login attempt for:', email);

    // Decrypt the RSA encrypted password
    let password;
    try {
      password = decryptPassword(encryptedPassword);
      console.log('Password decrypted successfully');
    } catch (decryptError) {
      console.error('Decryption failed:', decryptError.message);
      return res.status(400).json({ error: 'Invalid encrypted password' });
    }

    const user = await User. findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    console.log('User logged in successfully:', email);

    res.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        profileType: user. profileType,
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
router. get('/me', auth, async (req, res) => {
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

module.exports = router;