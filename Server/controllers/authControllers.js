const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const User = require('../models/userModel');

const createToken = (_id) => {
    const jwtkey = process.env.JWT_SECRET_KEY;

    return jwt.sign({ _id }, jwtkey, {expiresIn : '30d'});
};

const registerUser = async (req , res) => {

    try {
        const {name , email , password} = req.body;

        if (!name) {
            return res.status(400).json("Username is required!");
        }
        if (!email) {
            return res.status(400).json("Email is required!");
        }
        if (!password) {
            return res.status(400).json("Please fill out Password!");
        }

        let user = await User.findOne({ email });

        if (user) 
            return res.status(400).json("Email already exists! Try Logging in instead");

        if (!validator.isEmail(email))
            return res.status(400).json("Email must be a valid email..");
      
        if (!validator.isStrongPassword(password))
            return res.status(400).json("Password must be a strong password..");

        newUser = new User({name , email , password})

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password , salt);

        await newUser.save();
        const token = createToken(newUser._id);

        res.status(200).json({ _id : newUser._id , name , email , token})
    }
    catch(error){
        console.log("registration error : " + error);
        res.status(500).json(error);
    }
}

const loginUser = async (req , res) => {
    try {
        const {email , password} = req.body;

        let user = await User.findOne({email});
        if (!user)
            return res.status(400).json("Invalid email!");

        const isValidPassword = await bcrypt.compare(password , user.password);

        if (!isValidPassword)
            return res.status(400).json("Password is incorrect");

        const token = createToken(user._id);
        res.status(200).json({_id : user._id , name : user.name , email , token});
    }
    catch (error){
        console.log("login error : " + error);
        res.status(500).json(error);
    }
}

module.exports = {registerUser , loginUser}