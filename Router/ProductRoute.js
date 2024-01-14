const express = require('express')
const { Product } = require('../Controller/productController')

const router = express.Router()

router.post('/addProduct', AddProduct)

module.exports = router