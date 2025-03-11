import React, { useState } from 'react'
import AdminNav from './AdminNav'
import Viewvehicals from './Viewvehicals'
import AdminViewOwners from './AdminViewOwners '
import AdminViewUsers from './AdminViewUsers'
import AdminViewDrivers from './AdminViewDrivers '
import { useNavigate } from 'react-router-dom'
const Admindashboard = () => {
    const [openUpdate ,setOpenUpdate] = useState(false)
    const[selectedItem , setSelectedItem] = useState('')

  const handleItemClick = (item:any) =>{
    setOpenUpdate(!openUpdate)
    setSelectedItem(item)
  }
  const NavigateTo = useNavigate()
  const logout = () =>{
    localStorage.clear()
    NavigateTo('/')
  }

  return (
    <div>
        <AdminNav/>
        <div className=" flex">

      <div className=" flex justify-items-center">

<div className=" h-screen">
<div className="bg-gray-800 text-white w-64 h-full flex flex-col">
<div className="p-4 border-b border-gray-700">
  <h1 className="text-2xl font-bold">Sidebar</h1>
</div>

<div className="p-4">
  <ul className="space-y-2">
    <li className="hover:bg-gray-700 p-2 rounded-md cursor-pointer" >Home</li>
    <li className="hover:bg-gray-700 p-2 rounded-md cursor-pointer" onClick={()=>handleItemClick('owners')}  >view Owners </li>
    <li className="hover:bg-gray-700 p-2 rounded-md cursor-pointer"  onClick={()=>handleItemClick('users')}>View customers</li>
    <li className="hover:bg-gray-700 p-2 rounded-md cursor-pointer"  onClick={()=>handleItemClick('vehicals')}>View vehicals</li>
    {/* <li className="hover:bg-gray-700 p-2 rounded-md cursor-pointer" onClick={()=>handleItemClick('driver')} >view driver</li> */}
    <li className="hover:bg-gray-700 p-2 rounded-md cursor-pointer" onClick={logout}>Logout</li>
  </ul>
</div>
</div>
</div>




</div>

<div className="">
    <div className=" ml-44">

    {openUpdate && selectedItem === 'vehicals' && <Viewvehicals/>}
    {openUpdate && selectedItem === 'owners' && <AdminViewOwners/>}
    {openUpdate && selectedItem == 'users' && <AdminViewUsers/>}
    {openUpdate && selectedItem == 'driver' && <AdminViewDrivers/>}
    </div>

</div>
        </div>
    </div>
  )
}

export default Admindashboard
