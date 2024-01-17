const express = require('express');
const {createCustomer, loginCustomer, VerifyUser} = require('../Controller/userController')

const router = express.Router()

router.post('/signup',VerifyUser, createCustomer)
router.post('/login',VerifyUser, loginCustomer)

module.exports = router