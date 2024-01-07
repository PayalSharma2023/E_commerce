const express = require('express');
const {createCustomer} = require('../Controller/customerController')

const router = express.Router()

router.post('/signup', createCustomer)

module.exports = router