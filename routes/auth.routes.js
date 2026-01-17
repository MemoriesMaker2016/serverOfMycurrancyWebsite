const express = require('express');
const { body } = require('express-validator');
const { register } = require('../controllers/auth.controller.js');

const router = express.Router();

router.post(
  '/register',
  [
    body('firstName').notEmpty(),
    body('lastName').notEmpty(),
    body('email').isEmail(),
    body('phone').notEmpty(),
    body('password').isLength({ min: 8 }),
    body('country').notEmpty(),
  ],
  register,
);

module.exports = router;
