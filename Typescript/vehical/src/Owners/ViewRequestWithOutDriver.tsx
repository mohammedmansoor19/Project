import React, { useEffect, useState } from 'react';
import AxiosApi,{url} from '../AxiosApi';

const ViewRequestWithOutDriver = () => {

const [data,setdata] = useState([])
const [status , setstatus] = useState<string>('')
  // Dummy data for rendering
  const owners = localStorage.getItem('owner')
  const owner = owners ? JSON.parse(owners) : null;
  
const gettingrequest = async() =>{
  try{
    const response = await AxiosApi.get(`/owner/bookings/${owner._id}`)
    console.log(response,"getting")
    setdata(response.data.bookings)

  }catch(error){
    console.log(error,'erros')
  }
}


useEffect(()=>{
  gettingrequest()
},[])




const formatedate = (date:any) =>{
  const dates = new Date(date)
  return dates.toISOString().split('T')[0]
}


//status handlechange 
const handleStatusSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setstatus(e.target.value); // Update status state with the selected value
};

  
const statuschange = async (id: string) => {
  try {
    const response = await AxiosApi.put(`/owner/statuss/${id}`, {status:status});
    console.log(response, "response");
    gettingrequest();
  } catch (error) {
    console.log(error);
  }
};


  return (
    <div className="overflow-x-auto">
      <table className="max-w-200px divide-y divide-gray-200 p-4">
        <thead className="bg-gray-50">
          <tr>
            {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Id
            </th> */}
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
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Driver Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Driver Age
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Driving Lisence
            </th>
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
              {/* <td className="px-6 py-4 whitespace-nowrap">{item.id}</td> */}
              <td className="px-6 py-4 whitespace-nowrap">
              <img src={`${url}/Vehicals/${item.vehicles[0].Image}`} alt="" className=' w-28 h-32 object-contain'/>

              </td>
              <td className="px-6 py-4 whitespace-nowrap">{item.vehicles[0].vehicalType}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.vehicles[0].vehicalNumber}</td>
              {/* <td className="px-6 py-4 whitespace-nowrap">{item.ratePerHour}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.driverRatePerHour}</td> */}
              <td className="px-6 py-4 whitespace-nowrap">{item.vehicles[0].vehicalName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.DriverName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.DriverAge}</td>
              <td className="px-6 py-4 whitespace-nowrap">
              <img src={`${url}/Lisence/${item.lisence}`} alt="" className=' w-28 h-32 object-contain'/>

              </td>
              <td className="px-6 py-4 whitespace-nowrap">{item.Username}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.UserphoneNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.hours}</td>
              <td className="px-6 py-4 whitespace-nowrap">{formatedate(item.date)}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="">
                  <button className='ml-8  text-lg border-black text-white bg-lime-500 rounded-md' onClick={()=>statuschange(item._id)} >Send</button><br/>
                  <select name="status" onChange={handleStatusSelectChange} value={status}>
                    <option value="">Status</option>
                    <option value="accept">Accept</option>
                    <option value="reject">Reject</option>
                  </select>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewRequestWithOutDriver;
