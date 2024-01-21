const {ProductModel} = require('../Model/ProductModel')
const {OrderModel} = require('../Model/OrderModel')
const { Jwt } = require('jsonwebtoken')

const getAllOrders = async (req, res) => {

}

const GetProductsAdded = async (req, res) => {

}

const GetFamousProduct = async (req, res) => {

}

const DeliverOrder = async (req, res) => {

}

const confirmDelivery = async(req, res) => {

}

const sellerAuth = async (req, res, next) => {
    const bearerHeader = req.header('Authorization');
    if (!bearerHeader) {
        res.status(401).json({
            message : 'Please provide Token'
        })
        return
    }

    try {
        const decoded = Jwt.verify(bearerHeader, 'secret_key')

        if (decoded == undefined) {
            res.status(401).json({
                error : 'you are unauthorized or your token is invalid or expired.'
            })
            return
        }

        if (decoded.user.user != "seller") {
            res.status(401).json({
                message : 'this operationn can only be performed by seller'
            })
            return
        }

        req.user = decoded.user

        next()

    } catch (err) {
        res.status(500).json({
            message : 'internal server error',
            error : err.stack
                })
    }

}

module.exports = {getAllOrders, GetProductsAdded, DeliverOrder, confirmDelivery, sellerAuth, GetFamousProduct}
