const mongoose = require('mongoose')
const validator = require('validator')

const ProductSchema = mongoose.Schema({
    name : {
        type : String,
        trim : true,
        required : true
    },
    description : {
        type : String,
        trim : true,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    image : {
        type : String,
        validate : {
            validator : validator.isURL,
            message : "Image URL is invalid"
        }
    },
    rating : {
        type : Number,
        min : 1,
        max : 5
    }

})

const ProductModel = mongoose.model('product', ProductSchema)

module.exports = { ProductModel }