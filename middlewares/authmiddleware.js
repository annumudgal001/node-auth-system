const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authheader = req.headers['authorization'];
    const token = authheader && authheader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token is not provided' });
    }

    // Decoding the token
    try {
        const decodedtokeninfo = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userInfo = decodedtokeninfo; // Add user info to request object
        next(); // Proceed to the next middleware/route
    } catch (error) {
        return res.status(403).json({ message: 'Token is not valid' });
    }
};

module.exports = auth;