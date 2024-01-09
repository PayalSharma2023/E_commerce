const { CustomerModel } = require("../Model/customerModel")
const bcrypt = require('bcrypt')

const createCustomer = async (req, res) => {

    try {
        const {name, email, password, address} = req.body
        if (!name || !email || !password ||!address) {
            res.status(400).json({
                message : "please enter name, email, password and address"
            })
            return
        }
        hash_password = await bcrypt.hash( password, 8 )
        const customer = await CustomerModel({
            name : name,
            email : email,
            password : hash_password,
            address : address
        })

        await customer.save()

        res.status(200).json({
            message : "customer created successfully"
        })

    } catch (err) {
        
    }

}

const loginCustomer = async (req, res) => {
    try {
        const {email, password} = req.body
        if (!email || !password) {
            res.status(400).json({message : "please enter email and password"})
            return
        }
        const exsistingCustomer = await CustomerModel.findOne(email)
        if (!exsistingCustomer) {
            res.status(404).json({
                message : "customer not found"
            })
            return
        }

        const passwordMatch = await bcrypt.compare(password, exsistingCustomer.password)

        if (passwordMatch) {
            res.status(200).json({
                message : "customer logged in successfully"
            })
            return
        }

    } catch (err) {
        res.status(500).json({message : "internal server error" + err})
    }
}

module.exports = {createCustomer, loginCustomer}