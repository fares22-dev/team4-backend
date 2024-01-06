const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.route('/register').post(authController.register);
router.route('/login').post(authController.login);
router.route('/verify-email').get(authController.verifyEmail); // Add this line for email verification
router.route('/update').put(authController.update);

module.exports = router;
