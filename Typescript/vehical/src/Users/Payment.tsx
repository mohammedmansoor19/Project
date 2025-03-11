import React, { useState } from 'react'
import AxiosApi from '../AxiosApi'
import { toast } from 'react-toastify'



interface bank {
    CardHolder:string,
    CardNumber:string,
    Expiredate:string,
    cvv:number
}






const Payment = ({product}:{product:any}) => {


 const [data,setdata] = useState<bank>({
    CardHolder:'',
    CardNumber:'',
    Expiredate:'',
    cvv:0
 })

const hadlechange =(e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value} = e.target
    setdata({...data,[name]:value})
}



const  paymentcomplete = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    console.log(data,"sending data")
    try{
        const formdata = new FormData()
        formdata.append("Cardholder",data.CardHolder)
        formdata.append("cardNumber",data.CardNumber)
        formdata.append("expire",data.Expiredate)
        formdata.append("cvv",data.cvv.toString())
        const response = await AxiosApi.post(`/customer/payments/${product._id}`,formdata)
        console.log(response,"payment")
        toast.success(response.data.message)

    }catch(error:any){
        console.log(error);
        toast.error(error.response.data.message)
        
    }
}





  return (
    <div>
      <div className=" w-500px h-96 shadow-lg">
        <form action="" className=' p-11' onSubmit={paymentcomplete}>
          <h4 className='text-center text-2xl uppercase underline'>payment page</h4><br/>
        <label htmlFor="CardHolder"  className="block text-sm font-medium text-gray-700">CardHolder</label>
        <input type="text" name='CardHolder' className="mt-1 p-2 border rounded-md w-full" required onChange={hadlechange}/><br/>
        <label htmlFor="CardHolder"  className="block text-sm font-medium text-gray-700">CardNumber</label>
        <input type="text" name='CardNumber' className="mt-1 p-2 border rounded-md w-full" required onChange={hadlechange}/><br/>
        <div className=" flex space-x-6 mt-2">

        <label htmlFor="CardHolder"  className="block text-sm font-medium text-gray-700 mt-3">Expiredate:</label>
        <input type="text" name='Expiredate' className="mt-1 p-2 border rounded-md w-full" required onChange={hadlechange}/><br/>
        <label htmlFor="CardHolder"  className="block text-sm font-medium text-gray-700 mt-3">CVV:</label>
        <input type="number" name='cvv' className="mt-1 p-2 border rounded-md w-full"  required onChange={hadlechange}/><br/>
        </div>
        <button className=' text-lg text-center text-white bg-sky-300 hover:bg-sky-600 rounded-md shadow-md align-middle mt-5 h-12 p-2 w-28 relative left-52' type='submit'>{product.totalamount} Pay</button>
        </form>

      </div>
    </div>
  )
}

export default Payment
