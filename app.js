const express = require('express')
const CustomerRouter = require('./Router/CustomerRoute')
const app = express()

app.use(express.json())

app.use('/customer', CustomerRouter)