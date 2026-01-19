const express = require('express');
const router = express.Router();
const ForexOrder = require('../models/UserCurrencyData.js');

router.post('/create', async (req, res) => {
  try {
    const {
      userId,
      orderType,
      product,
      fromCurrency,
      toCurrency,
      inputAmount,
      convertedAmount,
      rate,
    } = req.body;

    const order = await ForexOrder.create({
      userId,
      orderType,
      product,
      fromCurrency,
      toCurrency,
      inputAmount,
      convertedAmount,
      rate,
    });

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
    });
  }
});

router.get('/my-orders/:userId', async (req, res) => {
  try {
    const orders = await ForexOrder.find({
      userId: req.params.userId,
    }).sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

const orders = await ForexOrder.find({ userId })
  .populate('userId', 'firstName lastName email phone')
  .sort({ createdAt: -1 });

module.exports = router;
