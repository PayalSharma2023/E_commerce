const express = require('express')
const { OrderPlaced, UpdateOrder } = require('../Controller/orderController')

const router = express.Router()

router.post('/order', OrderPlaced)
router.put('/update_order', UpdateOrder)

module.exports = router