import Admin from "../models/Admin"
require('dotenv').config()

export const checkDuplicateEmail = async (req, res, next) => {

    const existEmail = await Admin.findOne({email : req.body.email}); 

    if(existEmail) return res.status(400).json({message : 'The email already exists'})

    next()
}

export const isAuthorizedToCreateAdmin = (req, res, next) => {
    const {adminPassword} = req.body
    if( !adminPassword || adminPassword !== process.env.ADMIN_PASSWORD) return res.status(401).json({message : "You can't create Admin"})
    next()
}