const express = require('express')

// import muddleware 

const auth = require('../middleware/routeProtection')

// import schemas

const Category = require('../schemas/CategorySchema')
const Item = require('../schemas/ItemSchema')

const router = express.Router()

// GET routes

/*
    @Method: GET
    @Access: Protected
    @Description: Get all categories
    @Request headers: {
        token
    }
    @Response: {
        success <true, false>, categories
    }
*/

router.get('/allCategories', (req, res) => {
    Category
        .find()
        .then(categories => {
            res
                .status(200)
                .json({
                    success: true,
                    categories
                })
        })
})

// POST routes

/*
    @Method: POST
    @Access: protected (admin only)
    @Description: create new item
    @Request Body type: {
        name,
        description
    }
    @Response: {
        success <true, false>, category?, msg?
    }
*/
router.post('/createCategory', auth, (req, res) => {
    if (!req.userData || !req.userData.isAdmin) {
        res
            .status(401)
            .json({
                success: false,
                msg: 'You must be an admin'
            })
        return;
    }
    let newCategory = new Category({
        ...req.body,
        items: []
    })

    newCategory
        .save()
        .then(createdCategory => {
            res 
                .status(200)
                .json({
                    success: true,
                    category: createdCategory
                })
        })
})

module.exports = router;