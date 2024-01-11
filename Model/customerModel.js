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
            validator : function(email) {
                if (typeof email !== 'undefined') {
                    let isValidEmail = validator.isEmail(email);
                    return isValidEmail
                } else {
                    console.error('email is undefined');
                    return false;
                }
            }
        }),
        unique : true
    },

    password : {
        type : String,
        require : true,
        validate : ({
            validator : function(pass){
                return pass && pass.length > 8 
            },
        })
    }, 

    address : {
        type : String,
        require : true
    }
})

const CustomerModel = mongoose.model('customer', CustomerSchema)

module.exports = { CustomerModel }