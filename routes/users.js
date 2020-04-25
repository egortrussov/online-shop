const express = require('express')

// import schemas 
const User = require('../schemas/UserSchema')

const router = express.Router();

// GET Routes


// POST Routes
/*
    @Method: POST
    @Access: public
    @Description: Register new user
    @Request Body type: {
        email, password, telephone, username
    }
    @Response: {
        success <true, false>, createdUser, token
    }
*/

router.post('/register', (req, res) => {
    const userCreds = req.body;
    if (!userCreds.email || !userCreds.password || !userCreds.telephone || !userCreds.username) {
        res
            .status(400)
            .json({ success: false, msg: 'Please fill in all creds' });
        return;
    }
    const newUser = new User({
        ...userCreds,
        orders: [],
        isAdmin: false
    })
    
    newUser
        .save()
        .then(createdUser => {
            res 
                .status(200)
                .json({
                    success: true,
                    user: createdUser,
                    token: '' // TODO: add jwt tokens
                })
        })
})

module.exports = router;