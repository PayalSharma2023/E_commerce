const mongoose = require('mongoose')
const validator = require('validator')

const UserSchema = mongoose.Schema({
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
    },

    user : {
        type : String,
        //to define who is using the website i.e limiting their options to three
        enum : ['seller', 'customer', 'admin'],
        require : true
    },

    wishlist : {
        type : Array
    }
})

const UserModel = mongoose.model('user', UserSchema)

module.exports = { UserModel }