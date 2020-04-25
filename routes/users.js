const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

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

    let salt = bcrypt.genSaltSync(12);
    let hash = bcrypt.hashSync(userCreds.password, salt);

    const newUser = new User({
        ...userCreds,
        password: hash,
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

/*
    @Method: POST
    @Access: public
    @Description: Login user
    @Request Body type: {
        email, password
    }
    @Response: {
        success: <true, false>, msg?, token?
    }
*/

router.post('/login', (req, res) => {
    const creds = req.body;
    User 
        .findOne({ email: creds.email })
        .then(foundUser => {
            if (!foundUser) {
                res
                    .status(400)
                    .json({
                        success: false,
                        msg: 'User not found'
                    })
                return;
            }
            if (creds.password === foundUser.password) {
                let token = jwt.sign({
                    userId: foundUser._id,
                }, process.env.JWT_SECRET, {
                    expiresIn: 3600
                })
                res
                    .status(200)
                    .json({
                        success: true,
                        token,
                    })
            } else {
                res
                    .status(400)
                    .json({
                        success: false,
                        msg: 'Invalid password'
                    })
            }
        })
})

module.exports = router;