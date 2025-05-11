const jwt = require('jsonwebtoken')
const User = require("../models/userModel")

const fetchUser = async (req, res, next) => {
    // Check for token in Authorization header (Bearer token)
    let token = req.header('Authorization');
    if (token && token.startsWith('Bearer ')) {
        token = token.split(' ')[1];
    } else {
        // Fallback to auth-token header
        token = req.header('auth-token');
    }

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided!' });
    }

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(data._id).select('-password');

        if (!req.user) return res.status(401).json({ message: 'Auth user not found.' });
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(401).json({ message: 'Invalid token.' });
    }
}

module.exports = fetchUser;