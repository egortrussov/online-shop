const jwt = require('jsonwebtoken')

module.exports = geterateToken = (userId, expiration) => {
    let token = jwt.sign({
        userId: userId
    }, process.env.JWT_SECRET, {
        expiresIn: expiration
    })
    
    return token;
}