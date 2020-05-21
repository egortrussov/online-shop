const express = require('express')

// import schemas

const Order = require('../schemas/OrderSchema')
const Item = require('../schemas/ItemSchema')
const User = require('../schemas/UserSchema')

// import middleware

const auth = require('../middleware/routeProtection')

const router = express.Router();

// GET routes

/*
    @Method: GET
    @Access: Private
    @Description: Get all orders of a user
    @Request Params: {
        userId
    }
    @Request headers: {
        token
    }
    @Response: {
        success <true, false>, orders
    }
*/

router.get('/allOrders/:userId', auth, (req, res) => {
    const { userId } = req.params;

    User
        .findOne({ _id: userId })
        .then(foundUser => {
            if (!foundUser) {
                res
                    .status(400)
                    .json({ 
                        success: false 
                    });
                return;
            }
            
            Order 
                .find({ _id: { $in: foundUser.orders } })
                .then(orders => {
                    res 
                        .status(200)
                        .json({
                            success: true,
                            orders
                        })
                })
        })
})

/*
    @Method: GET
    @Access: Private (admin only)
    @Description: Get all orders by all users
    @Request Params: {
        userId
    }
    @Request headers: {
        token
    }
    @Response: {
        success <true, false>, orders
    }
*/

router.get('/allOrdersByUsers', auth, (req, res) => {
    if (!req.userData.isAdmin) 
        return res  
                    .status(401)
                    .json({
                        success: false,
                        msg: 'You must be an admin',
                        isAccessError: false,
                        orders: null
                    })
    
    Order
        .find()
        .then(orders => {
            res
                .status(200)
                .json({
                    success: true,
                    orders
                })
        })
})

/*
    @Method: GET
    @Access: Protected
    @Description: Get order info
    @Request Params: {
        order id
    }
    @Request headers: {
        token
    }
    @Response: {
        success <true, false>, orders
    }
*/

router.get('/getOrder/:orderId', auth, (req, res) => {
    const { orderId } = req.params;

    Order 
        .findOne({ _id: orderId })
        .then(order => {
            res 
                .status(200)
                .json({
                    sucess: true,
                    order
                })
        })
})

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
    let items = new Map(), itemIds = [];
    
    let newOrder = new Order({
        ...req.body
    })

    // Check if there are less items available than reqested

    newOrder.items.forEach(it => {
        items.set(it.itemId, it.quantity);
        itemIds.push(it.itemId);
    });
    console.log(itemIds)

    let errors = [];
    let hasErrors = false;

    Item
        .find({ _id: { $in: itemIds } })
        .then(orderedItems => {
            orderedItems.forEach(it => {
                if (+it.quantity < +items[it._id]) {
                    errors[it._id] = true;
                    hasErrors = true;
                }
            })
        })
        .then(() => {
            if (hasErrors) {
                res 
                    .status(400)
                    .json({
                        success: false,
                        errors,
                        itemQuantities: items,
                        order: null
                    })
                return;
            }

            Item
                .find({ _id: { $in: itemIds } })
                .then(orderedItems => {
                    orderedItems.forEach(it => {
                        it.quantity -= items[it._id];
                        it.save()
                    })
                })
                .then(() => {
                    newOrder
                        .save()
                        .then(createdOrder => {
                            User 
                                .findOne({ _id: newOrder.userId })
                                .then(foundUser => {
                                    foundUser.orders.push(createdOrder._id);
                                    foundUser.save()
                                })

                            res 
                                .status(200)
                                .json({
                                    success: true,
                                    order: createdOrder
                                })
                        })
                })
        
        })
})

module.exports = router;