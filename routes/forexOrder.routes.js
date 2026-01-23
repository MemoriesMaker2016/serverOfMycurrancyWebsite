const express = require('express');
const router = express.Router();
const ForexOrder = require('../models/UserCurrencyData.js');
router.post('/create', async (req, res) => {
  console.log(req.userId);

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

module.exports = router;
