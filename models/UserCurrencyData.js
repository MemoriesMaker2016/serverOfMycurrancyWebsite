const mongoose = require('mongoose');

const forexOrderSchema = new mongoose.Schema(
  {
    // 🔗 User Reference
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    orderType: {
      type: String,
      enum: ['buy', 'sell'],
      required: true,
    },

    product: {
      type: String,
      enum: ['notes', 'card'],
      required: true,
    },

    fromCurrency: {
      type: String,
      required: true,
      uppercase: true,
    },

    toCurrency: {
      type: String,
      required: true,
      uppercase: true,
    },

    inputAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    convertedAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    rate: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('ForexOrder', forexOrderSchema);
