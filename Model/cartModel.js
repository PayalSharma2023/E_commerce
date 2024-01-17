const mongoose = require('mongoose')

const CartSchema = mongoose.Schema({
    order : {
        type : mongoose.Schema.ObjectId,
        ref : 'order'
    },

    wishlist : {
        type : mongoose.Schema.ObjectId,
        ref : 'wishlist'
    }
})