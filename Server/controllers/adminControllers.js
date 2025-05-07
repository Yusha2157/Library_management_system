const express = require('express');
const User = require('../models/userModel')
const Book = require('../models/bookModel')

const addBooks = async (req , res) => {
    try {
        const {
            rfid_tag ,
            name ,
            author ,
            isbn , 
            category , 
            publication_year , 
            cover_image , 
            description , 
            status
        } = req.body;

        const existing_book = await Book.findOne({rfid_tag});
        if (existing_book) {
            return res.status(400).json({message : "Book with this rfid_tag already exists!"});
        }

        const newBook = new Book(
            {
                rfid_tag , 
                name , 
                author , 
                isbn , 
                category ,
                publication_year , 
                cover_image , 
                description , 
                status
            }
        );

        await newBook.save();
        res.status(201).json({message : "Book Created Successfully!" , book : newBook });
    } catch (error) {
        console.log('Error adding Book : ' + error);
        res.status(400).json(error);
    }
}

const getUserInfo = async (req , res) => {
    try {
        const userId = req.params.id;

        const user = await User.findById(userId).select('-password');
        if (!user) return res.status(404).json({message : "User Not Found"});

        res.status(200).json({user});
    }
    catch (error) {
        console.log('Error getting User : ' + error);
        res.status(400).json({error});
    }
}

module.exports = {addBooks , getUserInfo}