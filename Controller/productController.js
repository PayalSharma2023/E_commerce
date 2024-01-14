const {ProductModel} = require("../Model/ProductModel")

const Product = async (req, res) => {
    try {
    const {name, description, price, image, AddToWishlist} = req.body

    if (!name || !description || !price || !image || !AddToWishlist){
        res.status(400).json({
            message : "please enter name, description, price, image and AddtoWishlist "
        })
        return
    }

    const products = await ProductModel({
        name : name,
        description : description,
        price : price,
        image : image,
        AddToWishlist : AddToWishlist
    })

    await products.save()

    res.status(200).json({
        message : "product added successfully"
    })

    } catch (err) {
        res.status(500).json({
            message : "internal server error"
        })
    }
}

module.exports = {
    Product
}