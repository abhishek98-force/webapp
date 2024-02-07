const express = require('express');
const router = express.Router();
const userMethods = require('../controllers/userController');

router.get('/self', userMethods.getUserInfo);
router.put('/self', userMethods.updateUser);
router.post('/', userMethods.createUser);

module.exports = router;