const { OrderModel } = require("../Model/OrderModel");

const OrderPlaced = async (req, res) => {
    const {product, customer, deliveryDate} = req.body;
    if (!product || !customer || !deliveryDate) {
        res.status(400).json({
            message : "please enter product , customer,  deliveryDate"
        })
        return
    }
    try {
        const order = await OrderModel({
            product : product, 
            customer : customer,
            deliveryDate : deliveryDate
        })

        await order.save()

        res.status(200).json({
            messsage : "order placed successfully",
            order : order._id
        })

    } catch (err) {
        res.status(500).json({
            message : "internal server"
        })
    }
}

const UpdateOrder = async (req, res) => {
    try {

    } catch (err) {
        res.status(500).json({
            message : "internal server error" + err
        })
    }
}

module.exports = { OrderPlaced, UpdateOrder }