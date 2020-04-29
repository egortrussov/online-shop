const jwt = require('jsonwebtoken')

module.exports = geterateToken = (userId, isAdmin, expiration) => {
    let token = jwt.sign({
        userId: userId,
        isAdmin
    }, process.env.JWT_SECRET, {
        expiresIn: 360000
    })
    
    return token;
}