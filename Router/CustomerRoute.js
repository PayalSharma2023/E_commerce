const express = require('express');
const router = express.Router()

router.post('/signup', createCustomer)

module.exports = router