import Product from "../models/Product"


export const createProduct = async (req, res) => {
    console.log(req.body)
    const {id, name, marca, description, price, imgURL, cantidad} = req.body;
    const newProduct = new Product({id, name, marca, description, price, imgURL, cantidad});

    const productSave = await newProduct.save();
    
    res.status(201).json(productSave)
}


export const getProductById = async (req, res) => {
    const product = await Product.find({id : req.params.productId});
    res.status(200).json(product)
}

export const updateProductById = async (req, res) => {
    
    const updatedProduct = await Product.findOneAndUpdate(req.params.productId, req.body, {
        new : true
    })

    res.status(200).json(updatedProduct)
}

export const deleteProductById = async (req, res) => {
    await Product.findOneAndDelete(req.params.productId);
    res.status(204).json({message : "Eliminado"});
}

