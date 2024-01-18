const express = require('express')
const { GetProducts, OrderProducts, addProductToWishlist, removeProductFromWishlist, filterProducts } = require('../Controller/customerController')

const router = express.Router()

router.get('/get_all_products', GetProducts)
router.post('/order_product', OrderProducts)
router.post('/add_to_wishlist', addProductToWishlist)
router.delete('/remove_from_wishlist', removeProductFromWishlist)
router.get('/filter', filterProducts)

module.exports = router