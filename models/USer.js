const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    phone: { type: String, required: true },

    password: { type: String, required: true },

    country: { type: String, required: true },
    state: { type: String },
    city: { type: String },
    address: { type: String },

    agreeTerms: { type: Boolean, required: true },
    agreeMarketing: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
