const Book = require('../models/bookModel')
const User = require('../models/userModel')

const scanRfid = async (req, res) => {
    try {
        const { rfid_tag, userId, action } = req.body;

        if (!rfid_tag) {
            return res.status(400).json({ message: "RFID tag is required" });
        }

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        if (!action || !['borrow', 'return'].includes(action)) {
            return res.status(400).json({ message: "Action must be either 'borrow' or 'return'" });
        }

        const book = await Book.findOne({ rfid_tag });
        const user = await User.findById(userId);
        
        if (!book) {
            return res.status(404).json({ message: "No book found with this RFID tag" });
        }

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (action === 'borrow') {
            if (book.status !== 'available') {
                return res.status(400).json({ message: "Book is not available for borrowing" });
            }

            // Update book status
            book.status = 'unavailable';
            await book.save();

            // Add book to user's borrowed books
            user.borrowedBooks.push({
                bookId: book._id,
                borrowedAt: new Date()
            });
            await user.save();

            res.status(200).json({
                message: "Book borrowed successfully",
                book: {
                    name: book.name,
                    author: book.author,
                    isbn: book.isbn,
                    category: book.category,
                    status: book.status,
                    rfid_tag: book.rfid_tag
                },
                borrowedBy: {
                    name: user.name,
                    email: user.email
                }
            });
        } else if (action === 'return') {
            if (book.status !== 'unavailable') {
                return res.status(400).json({ message: "Book is already available" });
            }

            // Check if user has borrowed this book
            const borrowedBook = user.borrowedBooks.find(
                b => b.bookId.toString() === book._id.toString()
            );

            if (!borrowedBook) {
                return res.status(400).json({ message: "This book was not borrowed by this user" });
            }

            // Update book status
            book.status = 'available';
            await book.save();

            // Remove book from user's borrowed books
            user.borrowedBooks = user.borrowedBooks.filter(
                b => b.bookId.toString() !== book._id.toString()
            );
            await user.save();

            res.status(200).json({
                message: "Book returned successfully",
                book: {
                    name: book.name,
                    author: book.author,
                    isbn: book.isbn,
                    category: book.category,
                    status: book.status,
                    rfid_tag: book.rfid_tag
                }
            });
        }
    } 
    catch (error) {
        console.log("error scanning rfid tag" + error);
        res.status(400).json({error});
    }
}

const handleRFIDScan = async (req, res) => {
    try {
        const { rfid_tag } = req.body;
        
        if (!rfid_tag) {
            return res.status(400).json({ message: 'RFID tag is required' });
        }

        // Clean the RFID tag (remove spaces and convert to uppercase)
        const cleanRfidTag = rfid_tag.replace(/\s+/g, '').toUpperCase();
        console.log('Processing RFID tag:', cleanRfidTag);

        // Find the book with the scanned RFID tag
        const book = await Book.findOne({ rfid_tag: cleanRfidTag });
        
        if (!book) {
            return res.status(404).json({ 
                message: 'Book not found. Please add this book to the database first.',
                rfid_tag: cleanRfidTag,
                action: 'not_found',
                instructions: 'Use the Add Book form to register this book with the RFID tag shown above'
            });
        }

        // Toggle the book status
        const newStatus = book.status === 'available' ? 'borrowed' : 'available';
        book.status = newStatus;
        await book.save();

        res.status(200).json({
            message: `Book ${newStatus === 'available' ? 'returned' : 'borrowed'} successfully`,
            book: {
                name: book.name,
                author: book.author,
                isbn: book.isbn,
                category: book.category,
                status: book.status,
                rfid_tag: book.rfid_tag
            },
            action: newStatus === 'available' ? 'return' : 'borrow'
        });
    } catch (error) {
        console.error('Error handling RFID scan:', error);
        res.status(500).json({ message: 'Error processing RFID scan' });
    }
};

module.exports = {scanRfid, handleRFIDScan}