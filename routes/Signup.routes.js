const express = require('express');
const router = express.Router();
const signupController = require('../controllers/user.controller');

router.route('/').post(signupController.SignupData);

module.exports = router;
