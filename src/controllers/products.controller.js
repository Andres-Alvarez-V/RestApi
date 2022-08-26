import Product from "../models/Product"


export const createProduct = async (req, res) => {
    try {
        
        const {id, name, marca, description, price, imgURL, cantidad} = req.body;

        const products = await Product.find({id});
        if(products.length !== 0){
            return res.status(400).json({
                success : false,
                msg : "Product is already in the databse"
            });
        }

        const newProduct = new Product({id, name, marca, description, price, imgURL, cantidad});
        const productSave = await newProduct.save();
        res.status(201).json(productSave)
    } catch (error) {
        console.log(error);
    }
}


export const getProductById = async (req, res) => {
    const product = await Product.find({id : req.params.productId});
    res.status(200).json(product)
}

export const updateProductById = async (req, res) => {
    try {
        const updatedProduct = await Product.findOneAndUpdate({id : req.params.productId}, req.body, {
            new : true
        })
    
        res.status(200).json(updatedProduct)
    } catch (error) {
        console.log(error);
    }
}

export const deleteProductById = async (req, res) => {
    const item = await Product.findOneAndDelete({id : req.params.productId});
    if(!item){
        return res.status(304).json({
            success : false,
            msg : "Item doesn't exist "
        });
    }
    res.status(200).json({
        success : true,
        msg : "Delete complete"
    });
}

