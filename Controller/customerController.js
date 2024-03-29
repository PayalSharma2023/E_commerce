const { UserModel } = require('../Model/UserModel')
const { OrderModel } = require('../Model/OrderModel')
const jwt = require('jsonwebtoken')
const { ProductModel } = require('../Model/ProductModel')

// const { use } = require('./Router/CustomerRoute')

const getAll = async (req, res) => {
    try {
        const Products = await ProductModel.find()//sort({date : 1, time : 1});
        //console.log("alltasks", AllTasks);
        res.status(200).json({
            message : "data retrieved successfully",
            Products
        })

    } catch (err) {
        res.status(500).json({
            message : "internal server error"
        })
    }

}


const GetProducts = async (req, res) => {
    try {
        const products = await ProductModel.find()
        if (!products) {
            res.status(404).json({ message: "product not found" })
            return
        }

        res.status(200).json({
            message: "Products retrieved successffully",
            products : products
        })

    } catch (err) {
        res.status(500).json({
            message: "internal server error" + err
        })
    }

}

const RateProducts = async (req, res) => {
    try {
        const rate = parseInt(req.query.rate);
        const productId = req.query.productId;

        if (!productId || rate < 1 || rate > 5) {
            res.status(400).json({
                message : "Invalid input"
            });
            return;            
        }

        const product = await ProductModel.findById(productId);

        if (!product) {
            res.status(404).json({
                message : "Product not found"
            });
            return;
        }

        product.rating = rate;
        await product.save();

        res.status(200).json({
            message : "Product rated successfully",
            product
        });

    } catch (err) {
        res.status(500).josn({
            message : "internal server error",
            error : err.stack
        })
    }
}

//order products crosschecked working succesfully
const OrderProducts = async (req, res) => {
    try {
        const productId = req.query.productId
        if (!productId) {
            res.status(400).json({
                message : "Please enter productId"
            })
            return
        }
        const product = await ProductModel.findOne({
            productId : req.body._id
        })

        if (!product) {
            res.status(404).json({
                message : "product not found"
            })
            return
        }

        // if (Order.includes({product : product._id})){
        //     res.status(400).json({
        //         message : "order placed already"
        //     })
        //     return
        // }

        //const now = new Date();
//const threeDayLater = Math.floor(new Date(now.setDate(now.getDate() + 3)).getTime() / 1000)


        const Order = await OrderModel({
            product : product,
            user : req.user._id,
            deliveryDate : Date.now() + 3*24*60*60*1000
            //date.now() returns the date and time in milli second
        })

        await Order.save()
        
        res.status(200).json({
            message : "order placed successfully"
        })

    } catch (err) {
        res.status(500).json({
            message : 'internal server error',
            error : err.stack
        })
    }

}
// cancel order api crosschecked and it is working successfully
const CancelOrder = async (req, res) => {
    try {
        const OrderId = req.query.OrderId
        if ( !OrderId ) {
            res.status(400).json({
                message : "Please enter order id"
            })
            return
        }

        const CancelOrder = await OrderModel.findByIdAndDelete(OrderId);

        if (CancelOrder == undefined) {
            res.status(400).json({
                message : "Order does not exist"
            })
            return
        }

        res.status(200).json({
            message : "Order cancelled successfully",
            CancelOrder
        })

    } catch (err) {
        res.status(500).json({
            message : "internal server error" + err
        })
    }

}

//addProductToWishlist crosschecked and it is working successfully
const addProductToWishlist = async (req, res) => {
    try {
        const productId = req.query.productId

        if (!productId) {
            res.status(400).json({
                message: "please enter product Id"
            })
            return
        }
        const user = await UserModel.findOne({
            _id : req.user._id
        })
        if (!user) {
            res.status(404).json({ message: "user not found" + err });
            return;

        }

        if (user.wishlist.includes(productId)) {
            res.status(400).json({
                message: "product already in the wishlist"
            });
            return;
        }

        user.wishlist.push(productId);
        await user.save()
        res.status(200).json({
            message: "product id added to wishlist successfully",
            productId
        })

        // const Addproduct = wishlist.append(productId)
        // await Addproduct.save()
        // return             

    } catch (err) {
        res.status(500).json({ message: "internal server error" + err })
    }

}

const removeProductFromWishlist = async (req, res) => {
    try {
        const userId = req.body.userId
        const productId = req.body.productId
        if (!productId || !userId) {
            res.status(400).json({
                message: "please enter product id"
            })
        }
        
        /*
            let wishlistedProducts = ["1", "2", "3", "6"]

            let updatedWishlist = ["1", "3"]

            wishlistedProducts.map(el => {
                if (el != "2") {
                    updatedWishlist.push(el)
                }
            })

            user.wishlist = updatedWishlist
            await user.save()
        */

        const user = await UserModel.findById(userId)
        if (user && user.wishlist.includes(productId)) {
            const index = user.wishlist.indexOf(productId);
            if (index > -1) {
                user.wishlist.splice(index, 1);
                await user.save();
                res.status(200).json({
                    message: "Product removed from wishlist successfully"
                });
                return;

            }
            if (index === -1) {
                res.status(400).json({
                    message: "Product not found in wishlist"
                });
            }

        }


    } catch (err) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}

const filterProducts = async (req, res) => {
    try{
        //const productId = req.query.productId
        console.log('hi')
        const Products = await ProductModel.find().sort(
            {
                price : 1
            }
        )
        res.status(200).json({
            message : "products sorted successfully",
            products : Products
        })


    } catch (err) {
        res.status(500).json({
            message : "internal server error"
        })
    }
    //sort
    //aggregation pipeline
    //pagination

}

const TrackOrder = async (req, res) => {
    try {
        const OrderId = req.query.OrderId

        if (!OrderId) {
            res.status(400).json({
                message : "Please enter order id"
            });
            return;
        }

        const order = await OrderModel.findById(OrderId);

        if (!order) {
            res.status(404).json({
                message : "order not found",
                order
            });
            return
        }

        res.status(200).json({
            message : "Order tracked successfully",
            order
        })

    } catch (err) {
        res.status(500).json({
            message : "internal server error" + err.stack
        })
    }
}

//customer Authentication working successfully
const customerAuth = async (req, res, next) => {
    const bearerHeader = req.header('Authorization');
    if (!bearerHeader) {
        res.status(401).json({ message: "Please provide token." })
        return 
    }

    try {
        const decoded = jwt.verify(bearerHeader, 'secret_key')

        if (decoded === undefined) {
            res.status(401).josn({
                error : 'You are unauthorized or your token is invalid or expired.'
            })
            return
        }


        if (decoded.user.user != "customer") {
            res.status(401).json({
                error : 'This operation can only be performed by customers.'
            })
            return
        }

        req.user = decoded.user 

        next()
    } catch (err) {
        res.status(401).json({
            msg : 'Internal Server Error',  
            error : err.stack
        })
    }
}

module.exports = {getAll,
    GetProducts, OrderProducts,CancelOrder, RateProducts,
    addProductToWishlist, removeProductFromWishlist, filterProducts, TrackOrder,
    customerAuth
}