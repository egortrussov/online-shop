const express = require('express')
const bcrypt = require('bcryptjs')


// import schemas 
const User = require('../schemas/UserSchema')

// import middleware 
const generateToken = require('../middleware/generateToken')
const auth = require('../middleware/routeProtection')

const router = express.Router();

// GET Routes

/*
    @Method: GET
    @Access: Protected
    @Description: Get info about the user from the database
    @Request Params: {
        userId
    }
    @Request headers: {
        token
    }
    @Response: {
        success <true, false>, user
    }
*/  
router.get('/userInfo/:userId', auth, (req, res) => {
    const userId = req.params.userId;
    User 
        .findOne({ _id: userId })
        .then(foundUser => {
            if (!foundUser) {
                res 
                    .status(400)
                    .json({
                        success: false,
                        user: null
                    })
                return;
            }
            res
                .status(200)
                .json({
                    success: true,
                    user: foundUser
                })
        })
})


// POST Routes

/*
    @Method: POST
    @Access: public
    @Description: Register new user
    @Request Body type: {
        email, password, telephone, username, isCompany, {
            ...company creds
        }
    }
    @Response: {
        success <true, false>, createdUser, token
    }
*/

router.post('/register', (req, res) => {
    const userCreds = req.body;
    console.log(userCreds)
    if (!userCreds.email || !userCreds.password || (!userCreds.isCompany && !userCreds.telephone) || (!userCreds.isCompany && !userCreds.username)) {
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
            let token = generateToken(createdUser._id, false, 3600);
            res 
                .status(200)
                .json({
                    success: true,
                    user: createdUser,
                    token
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
    console.log(creds)
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
            let doPasswordsMatch = bcrypt.compareSync(creds.password, foundUser.password)
            if (doPasswordsMatch) {
                let token = generateToken(foundUser._id, foundUser.isAdmin, 3600);
                res
                    .status(200)
                    .json({
                        success: true,
                        token,
                        user: foundUser
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