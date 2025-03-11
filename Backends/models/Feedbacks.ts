import mongoose from "mongoose";


const Feedback = new mongoose.Schema({
    customer:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Customer"
    },
    order:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Book"
    },
    date:{
        type:Date
    },
    rating:{
        type:Number
    },
    feed:{
        type:String
    }
})

let FeedBackModel = mongoose.model('Feedback',Feedback)

export default FeedBackModel