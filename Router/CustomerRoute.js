const express = require('express')
const { GetProducts, OrderProducts, CancelOrder, addProductToWishlist, removeProductFromWishlist, filterProducts, TrackOrder, customerAuth } = require('../Controller/customerController')

const router = express.Router()

// router.get('/get_all_products',customerAuth, GetProducts)
router.get('/order_product',customerAuth, OrderProducts)
router.delete('/cancel_order', customerAuth, CancelOrder)
router.get('/add_to_wishlist', customerAuth, addProductToWishlist)
// router.delete('/remove_from_wishlist',customerAuth, removeProductFromWishlist)
// router.get('/filter',customerAuth, filterProducts)
// router.get('/order_status', TrackOrder)

module.exports = router