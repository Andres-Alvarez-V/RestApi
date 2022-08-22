import mongoose from "mongoose"; 
require("dotenv").config()

mongoose.connect(process.env.MONGODB_URI ,{
    useNewUrlParser : true,
    useUnifiedTopology : true
})
    .then(db => console.log("Database is connected"))
    .catch(error => console.log(error))