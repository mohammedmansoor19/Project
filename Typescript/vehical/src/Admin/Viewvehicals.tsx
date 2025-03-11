import React, { useState } from 'react';
import AxiosApi, { url } from '../AxiosApi';

const ViewVehicles = () => {
  const [search, setSearch] = useState('');
  const [place, setplace] = useState('')
  const [data,setdata] = useState([])

  const handlesearch = (e:React.ChangeEvent<HTMLInputElement>) =>{
    setSearch(e.target.value)
  }

  const handletype = (e:React.ChangeEvent<HTMLSelectElement>) =>{
    setplace(e.target.value)   
  }





  const gettingvehicals = async() =>{
    try{
      const response = await AxiosApi.get(`/admin/vehicles?type=${place}&place=${search}`)
      console.log(response,"getting vehiclas")
      setdata(response.data.vehicles)

    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className="overflow-y-auto max-h-screen">
      <div className="flex items-center space-x-4 mt-2">
        {/* Select Input */}
        <select
        value={place}
        onChange={handletype}
          className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        >
          <option value="" >Select vehicals</option>
          <option value="Car">Car</option>
          <option value="Auto">Auto</option>
          <option value="Bike">Bike</option>
          <option value="Rikshaw">Rikshaw</option>
        </select>
        
        {/* Search Input */}
        <div className="relative">
          <input
          value={search}
          onChange={handlesearch}
            type="text"
            placeholder="Search...Place"
            className="py-2 pl-10 pr-4 border border-gray-300 rounded-lg w-64 focus:outline-none focus:border-blue-500"
          />
          {/* Search Icon (SVG) */}
          <svg
            className="h-5 w-5 absolute left-3 top-2 text-gray-400 pointer-events-none"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M21 21l-6-6m0 0l-6-6m6 6l-6 6m6-6l6 6"></path>
          </svg>
          <button onClick={gettingvehicals} type='submit' className=' w-16 h-10 rounded-md bg-sky-300 hover:bg-sky-700 p-2  ml-3' >Search</button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 p-3">

        {
          data && data.map((item:any)=>(
            <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm" key={item._id}>
              <a href="#">
                <img
                  className="rounded-t-lg"
                  src={`${url}/Vehicals/${item.Image}`}
                  alt=""
                />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">
                    {item.vehicalName}
                  </h5>
                </a>
                <p className="text-gray-700 mb-3">
                  {item.vehicalType}
                </p>
                <ul>{item.state}</ul>
                <ul>{item.street}</ul>
                <ul>{item.vehicalNumber}</ul>
                </div>
              </div>
          
          

          ))
        }

      
      </div>
    </div>
  );
};

export default ViewVehicles;
