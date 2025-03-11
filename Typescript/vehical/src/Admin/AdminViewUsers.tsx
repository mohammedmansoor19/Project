import React, { useEffect, useState } from 'react'
import AxiosApi from '../AxiosApi';

const AdminViewUsers = () => {

 const [data,setdata] = useState([])

 const gettingusers =async() =>{
  try{
    const responce = await AxiosApi.get('/admin/users')
    console.log(responce)
    setdata(responce.data.users)

  }catch(error){
    console.log(error)
  }
 }


 useEffect(()=>{
  gettingusers()
 },[])








    // const owners = [
    //     { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
    //     { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com' },
    //     { firstName: 'Michael', lastName: 'Johnson', email: 'michael.johnson@example.com' },
    //     // Add more dummy data as needed
    //   ];
  return (
    <div>
       <div className="max-w-xl mx-auto p-6 bg-white rounded-md shadow-md mt-4 overflow-y-scroll min-h-screen ">
      <h2 className="text-xl font-semibold mb-4">Admin View Customers</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
          </tr>
        </thead>
        <tbody>
          {data  && data.map((owner:any, index:any) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-6 py-4 whitespace-nowrap">{owner.firstName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{owner.lastName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{owner.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default AdminViewUsers
