import mongoose from "mongoose";


const Customer = new mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
});


const CustomerModel = mongoose.model('Customer',Customer)

export default CustomerModel