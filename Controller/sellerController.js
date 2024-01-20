const {ProductModel} = require('../Model/ProductModel')
const {OrderModel} = require('../Model/OrderModel')

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
    next()
}

module.exports = {getAllOrders, GetProductsAdded, DeliverOrder, confirmDelivery, sellerAuth, GetFamousProduct}
