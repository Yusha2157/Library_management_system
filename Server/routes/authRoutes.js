const express = require('express');
const {
    registerUser , 
    loginUser 
} = require('../controllers/authControllers')
const router = express.Router();

router.post('/new' , registerUser);
router.post('/login' , loginUser);
// router.get('/me' , getMe);

module.exports = router;