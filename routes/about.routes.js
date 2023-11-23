const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const userController = require('../controllers/user.controller');

router.post('/', authMiddleware, userController.about);


module.exports = router;
