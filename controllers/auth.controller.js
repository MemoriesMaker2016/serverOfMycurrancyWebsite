const User = require('../models/USer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ForexOrder = require('../models/UserCurrencyData');
const { validationResult } = require('express-validator');

exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      country,
      state,
      city,
      address,
      agreeTerms,
      agreeMarketing,
    } = req.body;

    if (!agreeTerms) {
      return res.status(400).json({ message: 'Terms must be accepted' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      country,
      state,
      city,
      address,
      agreeTerms,
      agreeMarketing,
    });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(201).json({
      message: 'Account created successfully',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

/* LOGIN */
exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // 🔍 Check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // 🔐 Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // 🎟️ Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};




exports.createOrder = async (req, res) => {
  try {
    const {
      orderType,
      product,
      fromCurrency,
      toCurrency,
      inputAmount,
      convertedAmount,
      rate,
    } = req.body;

    const order = await ForexOrder.create({
      userId: req.userId,
      orderType,
      product,
      fromCurrency,
      toCurrency,
      inputAmount,
      convertedAmount,
      rate,
    });

    res.status(201).json({
      message: 'Order created successfully',
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
