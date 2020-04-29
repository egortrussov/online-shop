const express = require('express')

// import schemas

const Order = require('../schemas/OrderSchema')
const Item = require('../schemas/ItemSchema')

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
        success <true, false>, order, errors?
    }
*/ 
router.post('/newOrder', (req, res) => {
    let items = [], itemIds = [];
    
    let newOrder = new Order({
        ...req.body
    })

    // Check if there are less items available than reqested

    newOrder.items.forEach(it => {
        items[it.itemId] = it.quantity;
        itemIds.push(it.itemId);
    });
    console.log(itemIds)

    let errors = [];
    let hasErrors = false;

    Item
        .find({ _id: { $in: itemIds } })
        .then(orderedItems => {
            orderedItems.forEach(it => {
                console.log(it.quantity)
                console.log(it.quantity < items[it._id])
                if (+it.quantity < +items[it._id]) {
                    errors[it._id] = true;
                    hasErrors = true;
                }
            })
        })
        .then(() => {
            if (hasErrors) {
                console.log(errors['5ea502bf11f84e32608a5603'])
                res 
                    .status(400)
                    .json({
                        success: false,
                        errors,
                        order: null
                    })
                return;
            }
        
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
})

module.exports = router;