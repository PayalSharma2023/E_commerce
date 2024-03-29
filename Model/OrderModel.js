const mongoose = require('mongoose')
const validator = require('validator')

const OrderSchema = mongoose.Schema({
    product : {
        type : mongoose.Schema.ObjectId,
        ref : 'product'
    },
    customer : {
        type : mongoose.Schema.ObjectId,
        ref : 'user'
    },
    deliveryDate : {
        type : Date
    }
})

const OrderModel = mongoose.model('order', OrderSchema)
module.exports = { OrderModel }