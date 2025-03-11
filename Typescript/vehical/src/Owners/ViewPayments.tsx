import React, { useEffect, useState } from 'react'
import AxiosApi,{url} from '../AxiosApi';

const ViewPayments = () => {
    const [data,setdata] = useState([])

    let Owners = localStorage.getItem('owner')
    const owner = Owners ? JSON.parse(Owners) : null;




    const payments = async()=>{
        try{
            const responce = await AxiosApi.get(`/owner/payment/${owner._id}`)
            console.log(responce,"payments")
            setdata(responce.data.payments)

        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        payments()
    },[])




    const dummyData = {
        vehicleImage: "34.png",
        rating: 4.5,
        feedback: "Great experience with the vehicle. Smooth ride and comfortable seating.",
        username: "JohnDoe123",
        time: "2024-04-05 10:30 AM",
      };
  return (
    <div className=' grid grid-cols-3 gap-8 max-h-200px overflow-y-scroll'>
        {
            data && data.map((item:any)=>(

      <div className="max-w-sm rounded overflow-hidden shadow-lg" key={item._id}>
      <img className="w-full" src={`${url}/Vehicals/${item.vehicals[0].Image}`} alt="Vehicle" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">vehicalNumber: {item.vehicals[0].vehicalNumber}</div>
        <p className="text-gray-700 text-base">
        <span className=' text-xl font-bold'>
        DriverType:
            </span> {item.Orders[0].DriverType}
        </p>
        <p className="text-gray-700 text-base">
        <span className=' text-xl font-bold'>
        Username:
            </span> {item.Orders[0].Username}
        </p>
        <p className="text-gray-700 text-base">
        <span className=' text-xl font-bold'>
        status:
            </span> {item.status}
        </p>
        <p className="text-gray-700 text-base">
        <span className=' text-xl font-bold'>
        amount:
            </span> {item.amount}
        </p>
        <p className="text-gray-700 text-base">
          <span className=' text-xl font-bold'>
          Time:
            </span> {item.Orders[0].date}
        </p>
      </div>
    </div>
            ))
        }
   
    </div>
  )
}

export default ViewPayments
