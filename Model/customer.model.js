const mongoose = require('mongoose')
const validator = require('validator')

const Schema = mongoose.Schema({
    name : {
        type : String,
        trim : true,
        require : true
    },

    email : {
        type : String,
        require : true,
        validate : (email) => {
            validator.

        }
    }
})