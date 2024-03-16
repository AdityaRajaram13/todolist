const jwt = require('jsonwebtoken');
const User = require('../model/User');

const authenticate = async (req, res, next) => {
    const token = req.header('Authorization').split(" ")[1];
   
    if (!token) {
        return res.status(401).json({ status: 'failed', error: 'Access denied. No token provided.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ status: 'failed', error: 'Invalid token.' });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ status: 'failed', error: 'Invalid token.' });
    }
};

module.exports = authenticate;
