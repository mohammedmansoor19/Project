import React, { useEffect, useState } from 'react';
import AxiosApi, { url } from '../AxiosApi';

const FeedbackView = () => {

 const [data,setdata] = useState([])

 let owners = localStorage.getItem('owner')
 const owner = owners ? JSON.parse(owners) : null 

 const gettingfeedbacks = async() =>{
  try{
    const responce = await AxiosApi.get(`/owner/feedbacks/${owner._id}`)
    console.log(responce,"getting feedbacks")
    setdata(responce.data.Feedbacks)

  }catch(error){
    console.log(error)
  }
 }

 useEffect(()=>{
  gettingfeedbacks()
 },[])



  // Dummy data
  const dummyData = {
    vehicleImage: "34.png",
    rating: 4.5,
    feedback: "Great experience with the vehicle. Smooth ride and comfortable seating.",
    username: "JohnDoe123",
    time: "2024-04-05 10:30 AM",
  };

  return (
    <div className=" grid-cols-3 gap-5">
  {
    data && data.map((item:any)=>(

       <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <img className="w-full" src={`${url}/Vehicals/${item.vehicals[0].Image}`} alt="Vehicle" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Rating: {item.rating}</div>
          <p className="text-gray-700 text-base">
            Feedback: {item.feed}
          </p>
          <p className="text-gray-700 text-base">
            Username: {item.Customers[0].firstName + '' +item.Customers[0].lastName}
          </p>
          <p className="text-gray-700 text-base">
            Time: {item.date}
          </p>
        </div>
      </div> 
    ))
  }
    </div>
  );
};

export default FeedbackView;
