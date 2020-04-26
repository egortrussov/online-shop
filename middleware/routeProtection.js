const jwt = require('jsonwebtoken');

const JWT_SECRET = 'keyboardcat';

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    console.log(JWT_SECRET)

    if (!token) 
        return res 
                   .status(401)
                   .json({
                       success: false,
                       isTokenError: true,
                       message: 'No token provided'
                   });
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log(decoded)
        req.userData = decoded;
        next();
    } catch (e) {
        res
            .status(400)
            .json({ 
                success: false,
                isTokenError: true, 
                message: 'Token is not valid' 
            });
    }
}

module.exports = auth