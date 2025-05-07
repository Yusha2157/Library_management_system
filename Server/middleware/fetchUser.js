const jwt = require('jsonwebtoken')
const User = require("../models/userModel")

const fetchUser = async (req , res , next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({message : 'access denied. No token Provided!'});
    }

    try {
        const data = jwt.verify(token , process.env.JWT_SECRET_KEY);
        req.user = await User.findById(data._id).select('-password');

        if (!req.user) return res.status(401).json({message : 'Auth User not found.'});
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid token.' });
    }
}

module.exports = fetchUser;