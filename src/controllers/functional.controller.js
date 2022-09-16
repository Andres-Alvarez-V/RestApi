

export const generarIva = (req, res)=> { // Se calcula el iva con el 19%
    
    try {
    
        let ivaTotal = 0, precioTotal = 0
        const {products} = req.body
        console.log(products)
        products.forEach( (product) => {
            const {item, quantity} = product
            
            ivaTotal += item.price * 0.19*quantity
            precioTotal += item.price*quantity
        });

        precioTotal += ivaTotal
        const response = {
            "ivaTotal" : ivaTotal,
            "precioTotal" : precioTotal
        }
        
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(400)
    }   

}