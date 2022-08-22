import Admin from '../models/Admin'
import jwt from 'jsonwebtoken'
require("dotenv").config()

export const signUp = async (req, res) => {
    const { username, email, password } = req.body;
    const newAdmin = new Admin ({
        username,
        email,
        password : await Admin.encryptPassword(password)
    })

    const savedAdmin = await newAdmin.save();
    
    const token = jwt.sign({id: savedAdmin._id}, process.env.SECRET, {
        expiresIn : 10800 // 3 hrs
    })

    res.status(200).json({token})
}


export const signIn = async (req, res) => {

    const adminFound = await Admin.findOne({email : req.body.email})

    if(!adminFound) return res.status(400).json({token : null, message : "User not found"});
    
    const matchPassword = await Admin.comparePassword(req.body.password, adminFound.password)

    if(!matchPassword) return res.status(401).json({token:null, message : "Invalid password"})
    
    const token = jwt.sign({id: adminFound._id}, process.env.SECRET, {
        expiresIn : 10800 // 3hrs
    })

    res.status(200).json({token})
}