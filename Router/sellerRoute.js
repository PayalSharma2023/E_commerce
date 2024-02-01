const express = require('express')
const {GetAllorders, GetProductsAdded, DeliverOrder, confirmDelivery, sellerAuth, GetFamousProduct} = require('../Controller/sellerController')

const router = express.Router()

router.get('get_all_orders', GetAllorders)

module.exports = router