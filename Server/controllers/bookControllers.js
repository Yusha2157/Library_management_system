const Book = require('../models/bookModel');

const getBooks = async (req, res) => {
    try {
        const Books = await Book.find();
        res.status(200).json({Books});
    } catch (error) {
        res.status(400).json({message: "Unable to get Books!"});
    }
}

const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({message: "Book not found"});
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(400).json({message: "Unable to get Book!"});
    }
}

module.exports = {
    getBooks,
    getBookById
};