const express = require('express');
const {
    registerUser , 
    loginUser ,
    getUsers , 
    findUser
} = require('../controllers/authControllers')
const router = express.Router();

router.post('/new' , registerUser);
router.post('/login' , loginUser);
router.get('/allUser' , getUsers);
router.get('/userInfo' , findUser);

module.exports = router;