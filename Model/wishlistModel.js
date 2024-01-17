const mongoose = require('mongoose')
const validator = require('validator')

const WishlistSchema = mongoose.Schema({
    category : {
        type : String,
    },

    products : {
        type : mongoose.Schema.ObjectId,
        
    }

})

const WishlistModel = mongoose.model('wishlist', WishlistSchema)
module.exports = { WishlistModel }