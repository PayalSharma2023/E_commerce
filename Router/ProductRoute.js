const express = require('express')
const { AddProduct } = require('../Controller/productController')

const router = express.Router()

router.post('/addProduct', AddProduct)

module.exports = router