const nodemailer = require("nodemailer");
require("dotenv").config()

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


export const enviarFactura = async (req, res) => {

    try {
        const {user_email, user_name, products, subtotal, total_price} = req.body
        console.log(req.body)
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.GMAIL_USER, // generated ethereal user
                pass: process.env.GMAIL_PASSWORD, // generated ethereal password
            },
        });

        let htmlNameUser = '<div><b> Cliente : ' + user_name + '</b>'
        let htmlProducts = `
            <table>
                <tr style="text-align: left">
                    <th style="text-align: left">Product</th>
                    <th style="text-align: left">Price</th>
                    <th style="text-align: left">Quantity</th>
                </tr>
        `
        products.forEach( (product) => {
            const {item, quantity} = product
            htmlProducts += ('<tr><td>' + item.name + '</td><td>' + item.price + '</td><td>'+ quantity+'</td></tr>')
        });
        htmlProducts += '</table>'
        let htmlPriceTotal = '<p><b>Sub-total</b> : ' + subtotal + '</p><p><b>Total</b> : ' + total_price + '</p></div>'
        console.log(htmlPriceTotal)
        
        let htmlString = htmlNameUser + htmlProducts + htmlPriceTotal
        let info = await transporter.sendMail({
            from: '"ShoppyFast" <shoppyfasttemp@gamil.com>', // sender address
            to: user_email, // list of receivers
            subject: "Factura de compra", // Subject line
            html: htmlString, // html body
        });
        console.log(htmlString)

        console.log("Message sent: %s", info.messageId);
        return res.status(200).json({message : "Message was sent succesfully!"})
    } catch (error) {
        return res.status(400).json({message : "Something goes wrong!"})
    }
}