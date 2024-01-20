const { UserModel } = require("../Model/UserModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const createUser = async (req, res) => {

    try {
        const {name, email, password, address, user} = req.body
        if (!name || !email || !password ||!address ||!user) {
            res.status(400).json({
                message : "please enter name, email, password and address"
            })
            return
        }
        hash_password = await bcrypt.hash( password, 8 )
        const customer = new UserModel({
            name : name,
            email : email,
            password : hash_password,
            address : address,
            user : user
        })

        await customer.save()

        res.status(200).json({
            message : "customer created successfully",
            CustomerId : customer._id,
            token
        })

    } catch (err) {
        res.status(500).json({
            message : "internal server error" + err
        })
    }

}

const login = async (req, res) => {
    try {
        const {email, password} = req.body
        if (!email || !password) {
            res.status(400).json({message : "please enter email and password"})
            return
        }
        const exsistingCustomer = await UserModel.findOne({email : email}).select('+password')
        if (!exsistingCustomer) {
            res.status(404).json({
                message : "customer not found"
            })
            return
        }

        const passwordMatch = await bcrypt.compare(password, exsistingCustomer.password)

        console.log("Is Password Matched: ", passwordMatch)

        if (!passwordMatch) {
            res.status(401).json({
                message : "Authentication failed"
            })
            return
        }

        const refreshedUser = await UserModel.findOne({email : email})

        const token = jwt.sign({user : refreshedUser}, "secret_key", {expiresIn : '1h'})

        res.status(200).json({
            token,
            message : "user logged in successfully"
        })

    } catch (err) {
        res.status(500).json({message : "internal server error" + err})
    }
}

const VerifyUser = async (req, res, next) => {
    const bearerHeader = req.header('Authorization');
    if (!bearerHeader) {res.status(401).json({message : "Invalid bearerHeader"})}
    try{
        const decoded = jwt.verify(bearerHeader, process.env.Token_Secret, (err) => {
            console.log(err)
        })
        req.userID = decoded.userID
        console.log("authorized : ", decoded)
        res.status(200).josn({message : "bearerHeader verified successfully"})
        next()

    } catch (err) {
        res.status(500).json({
            message : "internal server error" + err
        })
    }
}

module.exports = {createUser, login, VerifyUser}