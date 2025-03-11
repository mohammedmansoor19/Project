import React, { useState } from 'react';
import AxiosApi from '../AxiosApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


interface vehical{
    vehicleType: string
    costPerHour: number
    costWithDriver: number
    brand: string
    vehicleNumber: number
    city: string
    state: string
    street: string
   
}


const UpdateVehicle = ({product}:{product:any}) => {





const [data ,setdata] = useState<vehical>({
  vehicleType: "",
  costPerHour: 0,
  costWithDriver: 0,
  brand: "",
  vehicleNumber: 0,
  city: "",
  state: "",
  street: "",
  
})

const [image,setimage] = useState<File | null>(null)


const NavigateTo = useNavigate()


const handlechange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
 const {name,value }= e.target;
 setdata({...data,[name]:value})

};

const handleimage = (e:React.ChangeEvent<HTMLInputElement>) =>{
  const files = e.target.files && e.target.files[0]
  setimage(files)
}


const ownersting = localStorage.getItem('owner')
const owner = ownersting ? JSON.parse(ownersting) : null;

const vehicalAdding = async(e:React.FormEvent<HTMLFormElement>) =>{
  e.preventDefault();
   const formdata = new FormData()
   formdata.append('Image', image as File)
   formdata.append('brand',data.brand)
   formdata.append('vehicleNumber',data.vehicleNumber.toString())
   formdata.append('vehicleType',data.vehicleType)
   formdata.append('costPerHour',data.costPerHour.toString())
   formdata.append('costWithDriver',data.costWithDriver.toString())
   formdata.append('city',data.city)
   formdata.append('state',data.state)
   formdata.append('street',data.street)
   
  try{
    const response = await AxiosApi.put(`/owner/vehicals/${owner._id}/${product}`,formdata)
    console.log(response,"repos")
    toast.success(response.data.message)

  }catch(error){
    console.log(error)
  }
}





  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-md shadow-md mt-4 ">
      <h2 className="text-xl font-semibold mb-4">Update Vehicle</h2>
      <form onSubmit={vehicalAdding}>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Image</label>
            <input type="file" id="brand" name="image" className="mt-1 p-2 border rounded-md w-full" required onChange={handleimage} />
          </div>
          <div className="mb-4">
            <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700">Vehicle Type</label>
            <select
        onChange={handlechange}
        id="vehicleType"
        name='vehicleType'
        className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
      >
        <option value="">select type</option>
        <option value="Car">car</option>
        <option value="Bike">Bike</option>
        <option value="Auto">Auto</option>
        <option value="Rikshaw">Rikshaw</option>
      </select>
          </div>
        </div>
        {/* <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand</label>
            <input type="text" id="brand" name="brand" className="mt-1 p-2 border rounded-md w-full" required />
          </div>
          <div className="mb-4">
            <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700">Vehicle Number</label>
            <input type="text" id="vehicleType" name="vehicleType" className="mt-1 p-2 border rounded-md w-full" required />
          </div>
        </div> */}
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand</label>
            <input type="text" onChange={handlechange} id="brand" name="brand" className="mt-1 p-2 border rounded-md w-full" required />
          </div>
          <div className="mb-4">
            <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700">Vehicle Number</label>
            <input type="text" id="vehicleType" name="vehicleNumber" onChange={handlechange} className="mt-1 p-2 border rounded-md w-full" required />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Enter ₹ /hrs</label>
            <input type="text" id="brand" name="costPerHour" onChange={handlechange}  className="mt-1 p-2 border rounded-md w-full" required />
          </div>
          <div className="mb-4">
            <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700">Enter ₹ /with driver/hrs</label>
            <input type="text" id="vehicleType" name="costWithDriver" onChange={handlechange} className="mt-1 p-2 border rounded-md w-full" required />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Selete City</label>
            <select
              className="form-select mt-3"
              name="city"
              onChange={handlechange}
             
            >


              <option selected>Select a City</option>
              <option>Pune</option>
              <option>Banglore</option>
              <option>Tiruapti</option>
              <option>Chennai</option>
              <option>Mumbai</option>
              <option>Delhi</option>
              <option>Hyderabad</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700">Selete State</label>
            <select
              className="form-select mt-3"
              name="state"
              onChange={handlechange}
              
            >


              <option selected>Select a state</option>
              <option>Maharashtra</option>
              <option>Karnataka</option>
              <option>Delhi</option>
              <option>Tamilnadu</option>
              <option>AP</option>
              <option>Jammu Kashmir</option>
              <option>Telangana </option>
              </select>
          </div>
          <div className="mb-4">
            <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700">enter Street</label>
            <input type="text" id="vehicleType" name="street" className="mt-1 p-2 border rounded-md w-full" required  onChange={handlechange}/>
          </div>
        </div>
       
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Submit</button>
      </form>
    </div>
  );
};

export default UpdateVehicle;
