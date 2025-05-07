const Book = require('../models/bookModel');

const getBooks = async (req , res) => {
    try {
        const Books = await Book.find();

        res.status(200).json({Books});

    } catch (error) {
        res.status(400).json({message : "Unable to get Books!"});
    }
}

module.exports = {
    getBooks
};