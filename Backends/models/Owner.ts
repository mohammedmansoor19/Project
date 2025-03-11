import mongoose from "mongoose";


const Owner = new mongoose.Schema({
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


const OwnerModel = mongoose.model('Owners',Owner)

export default OwnerModel