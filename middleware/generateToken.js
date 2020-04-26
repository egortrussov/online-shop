const jwt = require('jsonwebtoken')

module.exports = geterateToken = (userId, isAdmin, expiration) => {
    let token = jwt.sign({
        userId: userId,
        isAdmin
    }, process.env.JWT_SECRET, {
        expiresIn: expiration
    })
    
    return token;
}