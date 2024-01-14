const {ProductModel} = require("../Model/ProductModel")

const AddProduct = async (req, res) => {
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

const UpdateProduct =  async (req, res) => {
    try {
        const {productId, Updatedfields} = req.body
        if (! productId || !Updatedfields) {
            res.status(400).json({
                message : "please enter productId and UPdatedfields"
            })
            return
        }
        const updatedProduct = ProductModel.findByIdAndUPdate(
            productId, 
            {$set: Updatedfields},
            {new : true}
            )
        
        if (!updatedProduct) {
            res.status(404).json({
                message : "Product not found"
            })
            return
        }

        res.status(200).json({
            message : "Products updated successfully",
            updatedProduct
        })

    } catch (err) {
        res.status(500).json({
            message : "internal server error" + err
        })
    }

}




module.exports = {
    AddProduct,
    UpdateProduct
}