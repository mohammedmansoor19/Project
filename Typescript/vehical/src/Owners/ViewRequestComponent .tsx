import React, { useState,useEffect } from 'react';
import AxiosApi ,{url} from '../AxiosApi';
import AddDriver from './AddDriver ';

const ViewRequestComponent = () => {
  // Dummy data for rendering

const [data,setdata] = useState([])
const [showDriver, setShowDriver] = useState(false);
const [selectedOption, setSelectedOption] = useState('');
const [objectitem , setobjectitem] = useState({})



  const handleSelectChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleSend = async (item:any) => {
    if (selectedOption === 'Accept') {
      setShowDriver(true);
      setobjectitem(item)
    } else if(selectedOption === 'Reject') {
      try{
        const response = await AxiosApi.put(`/owner/status/${item._id}`,{status: 'reject'})
        console.log(response,"reject response")

      }catch(error){
        console.log(error)
      }
    }
  };




const owners = localStorage.getItem('owner')
const owner = owners ? JSON.parse(owners) : null


const request = async() =>{
  try{
    const response = await AxiosApi.get(`/owner/booking/${owner._id}`)
    console.log(response,"getting response")
    setdata(response.data.bookings)

  }catch(error){
    console.log(error)
  }
}


useEffect(()=>{
  request()
},[])




  const formatedate = (date:any) =>{
    const dates = new Date(date)
    return dates.toISOString().split('T')[0]
  }
  console.log(formatedate,"dates")
  return (
    <div className="">

    {!showDriver ? <div className="overflow-x-auto">
      <table className="w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Image
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Vehicle Type
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Vehicle No.
            </th>
            {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ₹/Hr
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ₹(Driver/Hr)
            </th> */}
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Brand
            </th>
            {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              City
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Street
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              State
            </th> */}
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User No.
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Hour
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Wish Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((item:any) => (
            <tr key={item.id}>

              <td className="px-6 py-4 whitespace-nowrap">
                <img src={`${url}/Vehicals/${item.vehicles[0].Image}`} alt="" className=' w-28 h-32 object-contain'/>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{item.vehicles[0].vehicalType}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.vehicles[0].vehicalNumber}</td>
              {/* <td className="px-6 py-4 whitespace-nowrap">{item.ratePerHour}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.driverRatePerHour}</td> */}
              <td className="px-6 py-4 whitespace-nowrap">{item.vehicles[0].vehicalName}</td>
              {/* <td className="px-6 py-4 whitespace-nowrap">{item.city}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.street}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.state}</td> */}
              <td className="px-6 py-4 whitespace-nowrap">{item.Username}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.UserphoneNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.hours}</td>
              <td className="px-6 py-4 whitespace-nowrap">{formatedate(item.date)}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className=" ">

                {/* <label htmlFor="Accept/reject">Update Status</label> */}
                <select name="status" id="status" onChange={handleSelectChange}>
                  <option value='' >Select</option>
                  <option value='Accept'>Accept</option>
                  <option value='Reject'>Reject</option>
                </select>
                <button className='ml-4 p-3 text-xl text-gray-50 rounded-lg bg-lime-500 font-serif' onClick={()=>handleSend(item)}>send</button>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>:
      <div className=" ml-96 mt-8 "> 
        <AddDriver product={objectitem}/>
      </div>
    }
    </div>
  );
};

export default ViewRequestComponent;
