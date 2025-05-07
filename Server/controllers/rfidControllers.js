const Book = require('../models/bookModel')
const User = require('../models/userModel')

const scanRfid = async (req , res) => {
    try {

    } 
    catch (error) {
        console.log("error scanning rfid tag" + error);
        res.status(400).json({error});
    }
}

module.exports = {scanRfid}