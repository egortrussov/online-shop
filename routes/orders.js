const express = require('express')

// import schemas

const Order = require('../schemas/OrderSchema')

// import middleware

const auth = require('../middleware/routeProtection')

const router = express.Router();

// GET routes



// POST routes
/*
    @Method: POST
    @Access: protected 
    @Description: create new order
    @Request Body type: {
        userId,
        items: [{}],
        totalPrice,
    }
    @Response: {
        success <true, false>, order
    }
*/ 
router.post('/newOrder', (req, res) => {
    let items = [];
    
    let newOrder = new Order({
        ...req.body
    })

    newOrder
        .save()
        .then(createdOrder => {
            res 
                .status(200)
                .json({
                    success: true,
                    order: createdOrder
                })
        })
})

module.exports = router;