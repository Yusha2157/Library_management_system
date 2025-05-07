const express = require('express');
const router = express.Router();
const {getBooks} = require('../controllers/bookControllers');

router.get('/' , getBooks);


module.exports = router;