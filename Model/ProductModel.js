const mongoose = require('mongoose')
const validator = require('validator')
const { link } = require('../Router/CustomerRoute')
const ProductSchema = mongoose.Schema({
    name : {
        type : String,
        trim : true
    },
    description : {
        type : String,
        trim : true
    },
    price : {
        type : String
    },
    image : {
        type : String
    },
    AddToWishlist : {
        type : Boolean
    }

})

const ProductModel = mongoose.model('product', ProductSchema)

module.exports = { ProductModel }