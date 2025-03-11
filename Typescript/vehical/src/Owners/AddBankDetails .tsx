import React, { useState } from 'react';
import AxiosApi from '../AxiosApi';
import { toast } from 'react-toastify';

interface bankdetails {
  bankName:string,
  bankBranch:string,
  AcountNumber:string,
  IfscCode:string
}


const AddBankDetails = () => {


const [data,setdata] = useState<bankdetails>({
  bankName:"",
  bankBranch:"",
  AcountNumber:"",
  IfscCode:""
})


const handlechange = (e:React.ChangeEvent<HTMLInputElement>) =>{
      const {name,value} = e.target
      setdata({...data,[name]:value})
}

const ownerstring = localStorage.getItem('owner')
const owner = ownerstring ? JSON.parse(ownerstring) : null

const bankdetilsAdd = async(e:React.FormEvent<HTMLFormElement>) =>{
  e.preventDefault()
  try{
    const response = await AxiosApi.post(`/owner/bank/${owner._id}`)
    console.log(response,"respo")
    toast.success(response.data.message)

  }catch(error){
    console.log(error)

  }
}






  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md mt-4">
      <h2 className="text-xl font-semibold mb-4">Add Bank Details</h2>
      <form onSubmit={bankdetilsAdd}>
        <div className="mb-4">
          <label htmlFor="bankName" className="block text-sm font-medium text-gray-700">Bank Name</label>
          <input type="text" id="bankName" name="bankName" className="mt-1 p-2 border rounded-md w-full" required onChange={handlechange} />
        </div>
        <div className="mb-4">
          <label htmlFor="branchName" className="block text-sm font-medium text-gray-700">Branch Name</label>
          <input type="text" id="branchName" name="bankBranch" className="mt-1 p-2 border rounded-md w-full" required onChange={handlechange} />
        </div>
        <div className="mb-4">
          <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">Account Number</label>
          <input type="text" id="accountNumber" name="AcountNumber" className="mt-1 p-2 border rounded-md w-full" required onChange={handlechange} />
        </div>
        <div className="mb-4">
          <label htmlFor="ifscCode" className="block text-sm font-medium text-gray-700">IFSC Code</label>
          <input type="text" id="ifscCode" name="IfscCode" className="mt-1 p-2 border rounded-md w-full" required onChange={handlechange}/>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Submit</button>
      </form>
    </div>
  );
};

export default AddBankDetails;
