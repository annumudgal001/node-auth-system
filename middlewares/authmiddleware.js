const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authheader = req.headers['authorization'];
//     console.log(authheader);
    const token = authheader && authheader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token is not provided' });
    }

    // Decoding the token
    try {
        const decodedtokeninfo=jwt.verify(token,process.env.JWT_SECRET_KEY)
     //    console.log(decodedtokeninfo)
        req.userInfo=decodedtokeninfo;
         // Add user info to request object for use in other routes
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Token is not valid' });
    }
    next();
};

module.exports = auth;