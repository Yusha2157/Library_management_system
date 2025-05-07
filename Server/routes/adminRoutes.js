const express = require('express')
const {
    addBooks , 
    getUserInfo ,
} = require('../controllers/adminControllers')
const fetchUser = require("../middleware/fetchUser");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

router.post('/addBook' , fetchUser , isAdmin , addBooks )
router.get('/getInfo/:id' , fetchUser , isAdmin , getUserInfo )

module.exports = router;