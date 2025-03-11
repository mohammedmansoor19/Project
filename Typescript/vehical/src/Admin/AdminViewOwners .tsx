import React, { useEffect, useState } from 'react';
import AxiosApi from '../AxiosApi';

const AdminViewOwners = () => {
  
const [data,setdata] = useState([])
const gettingowners = async() =>{
  try{
    const response = await AxiosApi.get('/admin/owners')
    console.log(response)
    setdata(response.data.Owners)

  }catch(error){
    console.log(error)
  }
}

useEffect(()=>{
  gettingowners()
},[])












  // Dummy data for owners
  const owners = [
    { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
    { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com' },
    { firstName: 'Michael', lastName: 'Johnson', email: 'michael.johnson@example.com' },
    // Add more dummy data as needed
  ];

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-md shadow-md mt-4 overflow-y-scroll min-h-screen ">
      <h2 className="text-xl font-semibold mb-4">Admin View Owners</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
          </tr>
        </thead>
        <tbody>
          {data&& data.map((owner:any, index:any) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-6 py-4 whitespace-nowrap">{owner.firstName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{owner.lastName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{owner.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminViewOwners;
