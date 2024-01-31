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
        const  { OrderID , UpdatedOrder } = req.body.OrderID

        if (!OrderID || !UpdatedOrder) {
            res.status(400).json({
                message : "Please enter OrderId and UpdatedOrder"
            })
            return
        }
        const Order = await OrderModel.findByIdAndUpdate(
            OrderID,
            {$set : UpdatedOrder},
            {new : true}
        )

        if (!Order) {
            res.status(404).json({
                message : "Order not found"
            })
            return
        }

        await Order.save()

        res.status(200).json({
            message : "Order updated successfully"
        })


    } catch (err) {
        res.status(500).json({
            message : "internal server error" + err
        })
    }
}

const DeleteOrder = async  (req, res) => {
    try {
        const OrderID = req.body.OrderID
        
        if (!OrderID) {
            res.status(400).json({
                message : "Please enter Order id"
            })
            return
        }

        const DeleteOrder = await OrderModel.findByIdAndDelete(OrderID)

        if (!DeleteOrder) {
            res.status(404).json({
                message : "Order does not exist"
            })
            return
        }

        res.status(200).json({
            message : "Order deleted successfully",
            OrderID : OrderID
        })

    } catch (err) {
        res.status(500).json({
            message : "internal server error" + err
        })
    }
}

module.exports = { OrderPlaced, UpdateOrder, DeleteOrder }