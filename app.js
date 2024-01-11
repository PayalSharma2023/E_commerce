const express = require('express')
const mongoose = require('mongoose')
const CustomerRouter = require('./Router/CustomerRoute')
const app = express()
require('dotenv').config()

app.use(express.json())

const MongoDB = process.env.MongoDBString
//const MongoDBString = 

mongoose.connect(MongoDB) 
    .then((c)=> {
        app.listen(3003), () => {
            console.log('connected to database')
            console.log('server running on port 3003')
        }

    })

app.use('/customer', CustomerRouter)