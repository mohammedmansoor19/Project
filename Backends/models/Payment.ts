import mongoose ,{Schema,Document} from "mongoose";
import { WatchDirectoryFlags } from "typescript";


const payments = new mongoose.Schema({
    Cardholder:{
        type:String
    },
    cardNumber:{
        type:String
    },
    expire:{
        type:String
    },
    cvv:{
        type:Number
    }
})


const Payment = new mongoose.Schema({
    order:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Book"
    },
    vehical:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"vehical"
    },
    customer:{
      type:mongoose.SchemaTypes.ObjectId,
      ref:"Customer"
    },
    Payments:{
       type:payments
    },
    status:{
        type:String,
        default:"Paid"
    },
    amount:{
       type:Number 
    },
    date:{
        type:Date
    }
});


let PaymentModel = mongoose.model('Payment',Payment)

export default PaymentModel