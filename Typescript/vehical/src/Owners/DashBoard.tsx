import React, { useState } from 'react'
import Ownernavbar from './Ownernavbar'
import AddVehicle from './AddVehicle'
import Viewvehicals from './Viewvehicals'
import ViewRequestComponent from './ViewRequestComponent '
import FeedbackView from './FeedbackView '
import AddBankDetails from './AddBankDetails '
//import AddDriver from './AddDriver '
import ViewRequestWithOutDriver from './ViewRequestWithOutDriver'
import ViewPayments from './ViewPayments'
import { useNavigate } from 'react-router-dom'

const DashBoard = () => {
 
    const [openUpdate, setOpenUpdate] = useState(false);
    const [selectedItem, setSelectedItem] = useState('');
  
    const handleItemClick = (item:any) => {
      setOpenUpdate(!openUpdate);
      setSelectedItem(item);
    };


const NavigateTo = useNavigate()

const logout = () =>{
  localStorage.clear()
  NavigateTo('/')
}

const owners = localStorage.getItem('owner')
const owner = owners ? JSON.parse(owners) : null



  return (
    <div>
      <Ownernavbar/>
      <div className=" flex justify-items-center">

      <div className=" h-screen">
      <div className="bg-gray-800 text-white w-64 h-full flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-2xl font-bold">{owner.firstName+ " " +owner.lastName}</h1>
      </div>
      <div className="p-4">
        <ul className="space-y-2">
          <li className="hover:bg-gray-700 p-2 rounded-md cursor-pointer" >Home</li>
          <li className="hover:bg-gray-700 p-2 rounded-md cursor-pointer"  onClick={() => handleItemClick('addvehicles')}>Add Vehicles</li>
          <li className="hover:bg-gray-700 p-2 rounded-md cursor-pointer" onClick={()=>handleItemClick('veiwvehicals')}>View Vehicles</li>
          <li className="hover:bg-gray-700 p-2 rounded-md cursor-pointer" onClick={()=>handleItemClick('request')}>View Requests with Driver</li>
          <li className="hover:bg-gray-700 p-2 rounded-md cursor-pointer" onClick={()=>handleItemClick('withoutdriver')}>ViewRequests withOut Driver</li>
          {/* <li className="hover:bg-gray-700 p-2 rounded-md cursor-pointer" onClick={()=>handleItemClick('bank')}>Add Bank Details</li> */}
          <li className="hover:bg-gray-700 p-2 rounded-md cursor-pointer" onClick={()=>handleItemClick('payment')}>View Payments</li>
          <li className="hover:bg-gray-700 p-2 rounded-md cursor-pointer" onClick={()=>handleItemClick('feedback')}>Feedback</li>
          <li className="hover:bg-gray-700 p-2 rounded-md cursor-pointer" onClick={logout}>Logout</li>
        </ul>
      </div>
    </div>
      </div>
      
      <div  >
        <div className=" ml-72">

      {openUpdate && selectedItem === 'addvehicles' && <AddVehicle />}
      {openUpdate && selectedItem == 'bank' && <AddBankDetails/>}
      {/* {openUpdate && selectedItem == 'driver' && <AddDriver/>} */}
        </div>
        <div className=" ml-20 mt-5">

      {openUpdate && selectedItem ==='veiwvehicals' && <Viewvehicals/>}
        </div>
        {openUpdate && selectedItem === 'request' && <ViewRequestComponent/>}
        {openUpdate && selectedItem === 'withoutdriver' && <ViewRequestWithOutDriver/>}
        <div className="ml-3">

        {openUpdate && selectedItem === 'feedback' && <FeedbackView/>}
        {openUpdate && selectedItem === 'payment' && <ViewPayments/>}
        
        </div>
      </div>


      </div>
    </div>
  )
}

export default DashBoard
