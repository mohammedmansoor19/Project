import { useEffect, useState } from "react"
import React  from 'react'
import AxiosApi, { url } from "../AxiosApi";
import { Link } from "react-router-dom";
import UpdateVehicle from "./UpdateVehicle";

const Viewvehicals = () => {
  //  const [search, setSearch] = useState("");
const [showUpdate, setShowUpdate]=useState(false)
   const [data,setdata] = useState([])
   const [product,setproduct] = useState('')

const handleupdate =(item:string) =>{
  setShowUpdate(true)
  setproduct(item)
  
}

  const owerstring = localStorage.getItem('owner')
  const owner = owerstring ? JSON.parse(owerstring) : null

   const gettingvehicals = async() =>{
    try{
      const response = await AxiosApi.get(`/owner/vehical/${owner._id}`)
      console.log(response,"respo");
      setdata(response.data.vehicals)

    }catch(error){
      console.log(error)
    }
   }


   useEffect(()=>{
    gettingvehicals()
   },[])

  const deleteVehical = async(id:string) =>{
    try{
      const response = await AxiosApi.delete(`/owner/vehical/${id}`)
      console.log(response,"delete response")

    }catch(error){
      console.log(error)
      
    }

  }








  return (
    <div>
   {!showUpdate? <div className=" overflow-y-auto max-h-screen">
      {/* <div className="d-flex ">
        <div className="col-md-2"></div>
        <iframe
          height="250"
          width="800"
          style={{ border: 0 }}
          loading="lazy"
          title="Maps"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCUA3uUquQ88On7YaIFbBpByARvNj64GAU
          &q=${search ? search : "Hyderabad"}`}
        ></iframe><div className="row">
            <div className=" flex mt-2">

        <div className="col">
          <input
            type="text"
            className="form-control my-2 w-60"
            placeholder="Type here to search..."
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        </div>
        <div className="col  form-floating">
          <select
          id="location"
            className="form-select w-60  "
            aria-label="Default select example"
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          >
            <option ></option>
            <option  value="young minds technology">
              Select Current Location
            </option>
          </select>
          <label className="text-primary" htmlFor="location"><b> Current Location</b></label>
        </div>
      </div>
            </div>

      </div> */}
      <div className="">
        
      </div>
      <div className=" grid grid-cols-3 p-3 mt-1">
      {
         data.map((item:any)=>(

      <div className="max-w-2xl mx-auto p-3" key={item._id}>
  <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
      <img
        className="rounded-t-lg min-h-44 max-h-48 object-cover"
        src={`${url}/Vehicals/${item?.Image}`}
        alt=""
      />
    </a>
    <div className="p-5">
      <a href="#">
        <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">
          {item.vehicalName}
        </h5>
      </a>
      <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">
       {
        item.
        vehicalNumber   }
      </p>
      <div className=" flex space-x-3">
        
      <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">Rent:
       {
        item.
        Amount   }
      </p>
      <p className="font-normal text-gray-700 mb-3 dark:text-gray-400"><span className=' text-xl text-slate-950'>withdriver: </span>
       {
        item.
        driverAmount   }
      </p>
      </div>
      <div className=" flex space-x-3">
        
      <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">vehicalType:
       {
        item.
        vehicalType   }
      </p>
      <p className="font-normal text-gray-700 mb-3 dark:text-gray-400"><span className=' text-xl text-slate-950'>City: </span>
       {
        item.
        city   }
      </p>
      </div>
      <div className=" flex space-x-6">

      <button onClick={()=>handleupdate(item._id)}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
       update
       
      </button>
      <button onClick={()=>deleteVehical(item._id)}
        className="text-white bg-red-600 hover:bg-red-200 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        delete
        
      </button>
      </div>
    </div>
  </div>
 
</div>
        ))
      }

      </div>

    </div>:<UpdateVehicle  product={product} />}</div>
  )
}

export default Viewvehicals
