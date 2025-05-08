const express = require('express');
const router = express.Router();
const { handleRFIDScan } = require('../controllers/rfidControllers');
const fetchUser = require('../middleware/fetchUser');

// Route for handling RFID scans
router.post('/scan', fetchUser, handleRFIDScan);

module.exports = router;