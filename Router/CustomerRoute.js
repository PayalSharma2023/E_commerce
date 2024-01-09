const express = require('express');
const {createCustomer, loginCustomer} = require('../Controller/customerController')

const router = express.Router()

router.post('/signup', createCustomer)
router.post('/login', loginCustomer)

module.exports = router