const { CustomerModel } = require("../Model/customerModel")

const createCustomer = async (req, res) => {
    try {
        const {name, email, password, address} = req.body
        if (!name || !email || !password ||!address) {
            res.status(400).json({
                message : "please enter name, email, password and address"
            })
            return
        }
        const customer = await customer.CustomerModel({
            name : name,
            email : email,
            password : password,
            address : address
        })
        res.status(200).json({
            message : "customer created successfully"
        })

    } catch (err) {
        
    }

}

module.exports = {createCustomer}