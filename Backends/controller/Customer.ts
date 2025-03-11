import { Router } from "express";
import { Request,Response,NextFunction } from "express";
import CustomerModel from "../models/Customer";
import VehicalModel from "../models/Vehicals";
import BookModel from "../models/Book";
import multer from "multer";
const router = Router()
import path from 'path'
import {v4 as uuidv4} from 'uuid'
import mongoose from "mongoose";
import PaymentModel from "../models/Payment";
import FeedBackModel from "../models/Feedbacks";

//customer register 
router.post('/register',async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {firstName,lastName,email,password} = req.body;
        const exictcustomer = await CustomerModel.findOne({email:email,password:password});
        if(exictcustomer){
            return res.status(400).json({
                success:false,
                message:"Email Already Exict"
            })
        }
        const Newcustomer = await CustomerModel.create({
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:password
        })
        if(Newcustomer){
            return res.status(201).json({
                success:true,
                message:"successfull register"
            })
        }

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
});


//customer login
router.post('/login',async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {email,password} = req.body;
        const Customer = await CustomerModel.findOne({email:email,password:password});
        if(!Customer){
            return res.status(404).json({
                success:false,
                message:"internal server error"
            })
        }else{
            return res.status(200).json({
                success:true,
                message:"Successful Login",
                Customer:Customer
            })
        }


    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Internal Server error"
        })
    }
});


//get the vehical by city name
router.get('/vehical/:userid',async(req:Request,res:Response,next:NextFunction)=>{
    const city : string = req.query.city as string;
    const userid: string = req.params.userid as string;
    const type : string = req.query.type as string
    try{
        const user = await CustomerModel.findById(userid);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No customer found with this id"
            });
        }

        let Vehical;

        if(city){
             Vehical = await VehicalModel.find({city:city}).exec()
        }else if (type){
            Vehical = await VehicalModel.find({vehicalType:type})
        }else if ( city && type){
            Vehical = await VehicalModel.find({city:city,vehicalType:type})
        }
        else{
             Vehical = await VehicalModel.find().exec()
        }

        if(Vehical.length === 0){
            return res.status(404).json({
                success:false,
                message:"no Vehical found"
            })
        }else{
            return res.status(200).json({
                success:true,
                Vehical:Vehical
            })
        }
        

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
})














const storage = multer.diskStorage({
    destination: 'Lisence', // Destination folder for saving license files
    filename: (req: any, file: any, cb: any) => {
        const unnifix = uuidv4();
        const fileextansction = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + unnifix + fileextansction);
    }
});

// Define file filter for license upload
const Filefilter = (req: any, file: any, cb: any) => {
    const ALLOw_TYPE = ['image/png', 'image/jpge'];
    if (ALLOw_TYPE.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Image Field is PNG or JPGE Formate Only"));
    }
};

// Create multer upload instance
const upload = multer({ storage: storage, fileFilter: Filefilter });

// Route handler for booking a vehicle
router.post('/book/:userid/:vehicalid', upload.single('Lisence'), async (req: Request, res: Response, next: NextFunction) => {
    const userid: string = req.params.userid as string;
    const vehicalid: string = req.params.vehicalid as string; // Fix parameter name
    try {
        const user = await CustomerModel.findById(userid);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No customer found with this id"
            });
        }

        const vehical = await VehicalModel.findById(vehicalid);
        if (!vehical) {
            return res.status(404).json({
                success: false,
                message: "No vehicle found with this id"
            });
        }

        const { Username, Useremmail, UserphoneNumber, hours, DriverType, amount, totalamount, date, DriverName, DriverAge } = req.body;

        // Check if driver details are provided
        let lisencePath = '';
        if (DriverType === 'withOutdriver') {
            // Check if license file is uploaded
            if (req.file) {
                lisencePath = req.file.path; // Save license file path
            } else {
                return res.status(400).json({
                    success: false,
                    message: "Driver license is required"
                });
            }
        }

        const newBooking = await BookModel.create({
            customer: userid,
            vehical: vehicalid,
            Username,
            Useremmail,
            UserphoneNumber,
            hours,
            DriverType,
            amount,
            totalamount,
            date,
            lisence: req.file?.filename, 
            DriverName,
            DriverAge
        });

        if (newBooking) {
            return res.status(201).json({
                success: true,
                message: "Booking successful"
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});









// router.get('/request/:id',async(req:Request,res:Response,next:NextFunction)=>{
//     const id : string = req.params.id as string;
//     try{
//         const user = await CustomerModel.findById(id);
//         if(!user){
//             return res.status(404).json({
//                 success:false,
//                 message:"internal server error"
//             })
//         }
//         const Vehicals = await BookModel.aggregate([
//             {
//                 $match:{
//                     $or:[
//                         {customer : new mongoose.Types.ObjectId(id)},
//                        {status:"processing"},
//                        {DriverType:"withdriver"}
                        
//                     ]
//                 }
//             },
//             {
//                 $lookup:{
//                     from: VehicalModel.collection.name,
//                     localField:"vehical",
//                     foreignField:"_id",
//                     as :"vehicals"
//                 }
//             }
//         ]);

//         console.log(Vehicals);

//         if(Vehicals.length === 0){
//             return res.status(404).json({
//                 success:false,
//                 message:"No Request Found"
//             })
//         }else{
//             return res.status(200).json({
//                 success:true,
//                 Vehicals:Vehicals
//             })
//         }


//     }catch(error){
//         console.log(error)
//         return res.status(500).json({
//             success:false,
//             message:"internal server error"
//         })
//     }
// })


//without driver
router.get("/request/:id",async(req:Request,res:Response,next:NextFunction)=>{
    const id :string = req.params.id as string
    try{
        const User = await CustomerModel.findById(id)
        if(!User){
            return res.status(404).json({
                succes:false,
                message:"no customer found with this id"
            })
        }
        const currentdate = Date.now()
        const Aceepts = await BookModel.aggregate([
            {
                $match:{
                    customer: new mongoose.Types.ObjectId(id),
                    status:"accept",
                    DriverType:"withoutdriver"

                }
            },
            {
                $lookup:{
                 from:VehicalModel.collection.name,
                 localField:"vehical",
                 foreignField:"_id",
                 as : "vehicals"
                }
            },{
                $sort:{
                    date: -1
                }
            },{
                $limit:10
            }
        ]);

    if(Aceepts.length === 0){
        return res.status(404).json({
            success:false,
            message:"no request found"
        })
    }else{
        return res.status(200).json({
            success:true,
            View:Aceepts
        })
    }
    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
})

//with driver
router.get("/driver/:id",async(req:Request,res:Response,next:NextFunction)=>{
    const id :string = req.params.id as string
    try{
        const User = await CustomerModel.findById(id)
        if(!User){
            return res.status(404).json({
                succes:false,
                message:"no customer found with this id"
            })
        }
        const currentdate = Date.now()
       // const Aceepts = await BookModel.find({customer:id,DriverType:"withdriver"}).populate('vehical')
        const Aceepts = await BookModel.aggregate([
            {
                $match:{
                    customer: new mongoose.Types.ObjectId(id),
                    status:"accept",
                    DriverType:"withdriver"

                }
            },
            {
                $lookup:{
                 from:VehicalModel.collection.name,
                 localField:"vehical",
                 foreignField:"_id",
                 as : "vehicals"
                }
            },{
                $sort:{
                    date: -1
                }
            },{
                $limit:10
            }
        ]);
    console.log(Aceepts)
    if(Aceepts.length === 0){
        return res.status(404).json({
            success:false,
            message:"no request found"
        })
    }else{
        return res.status(200).json({
            success:true,
            View:Aceepts
        })
    }
    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
})



//payment
router.post('/payments/:orderid',async(req:Request,res:Response,next:NextFunction)=>{
    const orderid :string = req.params.orderid as string;
    try{
       // console.log(orderid,"id")
        const Order = await BookModel.findById(orderid)
       // console.log(Order)
        const books = await BookModel.find().exec()
        //console.log(books, "orders")
        if(!Order){
            return res.status(404).json({
                success:false,
                message:"no order found"
            })
        }
        const already = await PaymentModel.findOne({order:orderid})
        if(already){
            return res.status(404).json({
                success:false,
                message:"Payment Already Done"
            })
        }
        const {Cardholder,cardNumber,expire,cvv,amount}  = req.body
        const payment = await PaymentModel.create({
            order:orderid,
            vehical:Order.vehical,
            customer:Order.customer,
            amount:Order.totalamount,
            Payments:{
                Cardholder,
                cardNumber,
                expire,
                cvv
            },
            date:Date.now()
        });
        if(payment){
            return res.status(201).json({
                success:true,
                message:"Payment done"
            })
        }

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
})


//get the history
router.get('/history/:id',async(req:Request,res:Response,next:NextFunction)=>{
    const id : string = req.params.id as string
    try{
        const Users = await CustomerModel.findById(id)
        if(!Users){
            return res.status(404).json({
                success:false,
                message:"no Customer found with this id"
            })
        }
        const currentdate = new Date()
        const History = await PaymentModel.aggregate([
            {
                $match:{
                    customer: new mongoose.Types.ObjectId(id),
                }
            },
            {
                $lookup:{
                    from:VehicalModel.collection.name,
                    localField:'vehical',
                    foreignField:"_id",
                    as : "vehicals"

                }
            },
            {
                $lookup:{
                    from:BookModel.collection.name,
                    localField:"order",
                    foreignField:"_id",
                    as : "orders"
                }
            },{
                $match:{
                    'orders.date':{$lte:currentdate}
                }
            }
        ]);
        console.log(History,"kdnckl")

        if(History.length === 0){
            return res.status(404).json({
                success:false,
                message:"no history found"
            })
        }else{
            return res.status(200).json({
                success:true,
                History:History
            })
        }

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
});

//give feedbacks
router.post('/feedback/:userid/:orderid',async(req:Request,res:Response,next:NextFunction)=>{
    const userid : string = req.params.userid as string
    const orderid : string = req.params.orderid as string;
    try{
        const order = await PaymentModel.find({customer:userid,order:orderid});
        if(!order){
            return res.status(404).json({
                success:false,
                message:"no order found"
            })
        }
        const {feed,rating} = req.body
        const Already = await FeedBackModel.findOne({customer:userid,order:orderid})
        console.log(Already)
        if(Already){
            return res.status(400).json({
                success:false,
                message:"Feedbak already done"
            })
        }else{
            const newfeed = await FeedBackModel.create({
                customer:userid,
                order:orderid,
                date:Date.now(),
                feed:feed,
                rating:rating
            })
            if(newfeed){
                return res.status(201).json({
                    success:true,
                    message:"Feedbak send successfully"
                })
            }
        
        }

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })

    }
})



export default router