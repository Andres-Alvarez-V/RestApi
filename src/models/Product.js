import mongoose, {Schema, model} from "mongoose";

const productSchema = new Schema({
        id: {
            type: Number,
            require:true,
            unique : true
        },
        name : String,
        marca : String,
        description : String,
        price: Number,
        imgURL : String,
        cantidad : Number
    },
    {
        versionKey : false,
    }
);


export default model('Product', productSchema);