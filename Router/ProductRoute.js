const express = require('express')
const { AddProduct, UpdateProduct, deleteProduct } = require('../Controller/productController')
const { sellerAuth } = require('../Controller/sellerController')

const router = express.Router()

router.post('/addProduct',sellerAuth, AddProduct)
router.put('/updateProduct',sellerAuth, UpdateProduct)
router.delete('/deleteProduct',sellerAuth, deleteProduct)

module.exports = router