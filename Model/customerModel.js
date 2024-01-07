const mongoose = require('mongoose')
const validator = require('validator')

const CustomerSchema = mongoose.Schema({
    name : {
        type : String,
        trim : true,
        require : true
    },

    email : {
        type : String,
        require : true,
        validate : ({
            validator : validator.isEmail(email),
            message : `${email} must be a email`
        }),
        unique : true
    },

    password : {
        type : String,
        require : true,
        validate : ({
            validator : function(pass){
                return  pass.length > 8 
            },
        })
    }, 

    address : {
        type : String,
        require : true
    }
})

const CustomerModel = mongoose.model('customer', CustomerSchema)

module.exports = {CustomerModel}