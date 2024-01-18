const express = require('express');
const {createUser, login, VerifyUser} = require('../Controller/userController')

const router = express.Router()

router.post('/signup',VerifyUser, createUser)
router.post('/login',VerifyUser, login)

module.exports = router