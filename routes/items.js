const express = require('express');
const multer = require('multer');
const path = require('path')

const router = express.Router();

// import muddleware 

const auth = require('../middleware/routeProtection')

// import schemas

const Item = require('../schemas/ItemSchema')
const Category = require('../schemas/CategorySchema')

// Config multer

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: storage
}) 


// GET routes

/*
    @Method: GET
    @Access: Public
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
    @Access: Public
    @Description: get item image
    @Request Params: {
        itemId
    }
    @Request headers: {
        token
    }
    @Response: {
        image
    }
*/

router.get('/itemImage/:itemId', (req, res) => {
    Item 
        .findOne({ _id: req.params.itemId })
        .then(item => {
            var filePath = path.join(__dirname, `../uploads/${ item.image }`);
            res
                .status(200)
                .sendFile(filePath)
        })
})

/*
    @Method: GET
    @Access: Public
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

router.get('/categoryItems/:categoryId', (req, res) => {
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
router.post('/createItem', auth, upload.single('photo'), (req, res) => {
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
        image: req.file.filename,
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
        item
    }
    @Request params: {
        itemId
    }
    @Response: {
        success <true, false>, item?, msg?
    }
*/
router.post('/updateItem/:itemId', (req, res) => {
    Item 
        .findOne({ _id: req.params.itemId })
        .then(item => {
            item = {
                ...item,
                ...req.item
            }
            item
                .save()
                .then((updatedItem) => {
                    res 
                        .status(200)
                        .json({
                            success: true,
                            item: updatedItem
                        })
                })
        })
})

/*
    @Method: POST
    @Access: Private
    @Description: Get all items from shopping cart
    @Request headers: {
        token
    }
    @Request body: {
        items: [itemId]
    }
    @Response: {
        success <true, false>, items
    }
*/

router.post('/shoppingCartItems', auth, (req, res) => {
    const itemIds = req.body.items;

    Item 
        .find({ _id: { $in: itemIds } })
        .then(foundItems => {
            res
                .status(200)
                .json({
                    success: true,
                    items: foundItems
                })
        })
})


module.exports = router;