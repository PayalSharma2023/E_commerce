const { UserModel } = require('../Model/UserModel')
const jwt = require('jsonwebtoken')

// const { use } = require('./Router/CustomerRoute')

const GetProducts = async (req, res) => {
    try {
        const products = await UserModel.find()
        if (!products) {
            res.status(404).json({ message: "product not found" })
            return
        }

        res.status(200).json({
            message: "Products retrieved successffully",
            products
        })

    } catch (err) {
        res.status(500).json({
            message: "internal server error" + err
        })
    }

}

const OrderProducts = async (req, res) => {

}

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

}

const TrackOrder = async (req, res) => {

}

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

module.exports = {
    GetProducts,
    OrderProducts,
    addProductToWishlist,
    removeProductFromWishlist,
    filterProducts,
    TrackOrder,
    customerAuth
}