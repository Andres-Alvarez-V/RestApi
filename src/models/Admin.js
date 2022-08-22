import {  Schema, model} from "mongoose";
import bcrypt from 'bcryptjs';


const adminSchema = new Schema({
    username: {
        type: String,
        require : true
    },
    email : {
        type : String,
        unique : true,
        require : true
    },
    password: {
        type: String,
        required :true
    }
}, {
    versionKey : false
});

adminSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt)
}

adminSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
}   




export default model('Admin', adminSchema)