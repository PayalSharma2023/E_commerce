const express = require('express')
const { Product } = require('../Controller/productController')

const router = express.Router()

router.post('/addProduct', Product)

module.exports = router