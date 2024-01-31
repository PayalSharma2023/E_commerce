const express = require('express')
const { OrderPlaced, UpdateOrder, DeleteOrder } = require('../Controller/orderController')

const router = express.Router()

router.post('/order', OrderPlaced)
router.put('/update_order', UpdateOrder)
router.delete('/delete_order', DeleteOrder)

module.exports = router