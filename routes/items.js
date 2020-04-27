const express = require('express');

const router = express.Router();

// import muddleware 

const auth = require('../middleware/routeProtection')

// import schemas

const Item = require('../schemas/ItemSchema')
const Category = require('../schemas/CategorySchema')

// GET routes

/*
    @Method: GET
    @Access: Protected
    @Description: Get info about the item from the database
    @Request Params: {
        itemId
    }
    @Request headers: {
        token
    }
    @Response: {
        success <true, false>, item
    }
*/

router.get('/itemInfo/:itemId', (req, res) => {
    const itemId = req.params.itemId;

    Item 
        .findOne({ _id: itemId })
        .then((foundItem) => {
            if (!foundItem) {
                res
                    .status(400)
                    .json({
                        success: false,
                        msg: 'No item found'
                    })
                return;
            }
            res 
                .status(200)
                .json({
                    success: true,
                    item: foundItem
                })
        })
})

/*
    @Method: GET
    @Access: Protected
    @Description: Get all items from category
    @Request params: {
        categoryId
    }
    @Request headers: {
        token
    }
    @Response: {
        success <true, false>, items
    }
*/

router.get('/categoryItems/:categoryId', auth, (req, res) => {
    const categoryId = req.params.categoryId;

    Category
        .findOne({ _id: categoryId })
        .then(category => {
            Item 
                .find({ _id: { $in: category.items } })
                .then(items => {
                    res 
                        .status(200)
                        .json({
                            success: true,
                            items
                        })
                })
        })
})

// POST routes
/*
    @Method: POST
    @Access: protected (admin only)
    @Description: create new item
    @Request Body type: {
        title,
        description,
        quantity,
        image ???,
        price,
        company,
        categoryId
    }
    @Response: {
        success <true, false>, item?, msg?
    }
*/
router.post('/createItem', auth, (req, res) => {
    if (!req.userData || !req.userData.isAdmin) {
        res
            .status(401)
            .json({
                success: false,
                msg: 'You mush be an admin'
            })
        return;
    }
    let newItem = new Item({
        ...req.body,
        customers: []
    })

    newItem
        .save()
        .then(createdItem => {
            Category 
                .findOne({ _id: req.body.categoryId })
                .then(foundCategory => {
                    foundCategory.items.push(createdItem._id);
                    foundCategory
                        .save()
                        .then(() => {
                            res 
                                .status(200)
                                .json({
                                    success: true,
                                    item: createdItem
                                })
                        })
                })

            
        })
}) 

/*
    @Method: POST
    @Access: protected (admin only)
    @Description: update existing item
    @Request Body type: {
        title,
        description,
        quantity,
        image ???,
        price,
        company,
        categoryId
    }
    @Request
    @Response: {
        success <true, false>, item?, msg?
    }
*/


module.exports = router;