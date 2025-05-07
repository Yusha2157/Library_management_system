const express = require('express');
const router = express.Router();

const {scanRfid} = require('../controllers/rfidControllers');

router.post('/scan' , scanRfid);
module.exports = router;