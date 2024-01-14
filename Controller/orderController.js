const CustomerModel = require("../Model/customerModel")

const OrderPlaced = async (req, res) => {
    const {product, customer, deliveryDate} = req.body;
    if (!product || !customer || !deliveryDate) {
    }
    try {

    } catch (err) {
        res.status(500).json({
            message : "internal server"
        })
    }
}