const express = require('express')
const mongoose = require('mongoose')
const UserRouter = require('./Router/UserRoute')
const OrderRouter = require('./Router/OrderRoute')
const ProductRouter = require('./Router/ProductRoute')
const CustomerRouter = require('./Router/customerRoute')
const SellerRouter = require('./Router/sellerRoute')
const AdminRouter = require('./Router/adminRoute')

const app = express()
require('dotenv').config()

app.use(express.json())

const MongoDB = "mongodb+srv://ecomm:ecomm2024ecomm@cluster0.w2gzl3f.mongodb.net/?retryWrites=true&w=majority"
//const MongoDBString = 

mongoose.connect(MongoDB) 
    .then((c)=> {
        app.listen(3003, () => {
            console.log('connected to database')
            console.log('server running on port 3003')
        })

    })

//blob storage


app.use('/user', UserRouter)
app.use('/order', OrderRouter)
app.use('/product', ProductRouter)
app.use('/customer', CustomerRouter)
app.use('/seller', SellerRouter)
app.use('/admin', AdminRouter)