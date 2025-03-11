import mongoose  from "mongoose";

const Bank = new mongoose.Schema({
    owner:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Owners'
    },
    bankName:{
        type:String
    },
    bankBranch:{
        type:String
    },
    AcountNumber:{
        type:String
    },
    IfscCode:{
        type:String
    }
});


let BankModel = mongoose.model("Bank",Bank);

export default BankModel