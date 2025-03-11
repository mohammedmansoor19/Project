import React, { useState } from 'react';
import AxiosApi from '../AxiosApi';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';

const Feedbacks = ({product}:{product:any}) => {
  const [rating, setRating] = useState(0);


 console.log(product,"product")




  const handleRatingChange = (value:any) => {
    setRating(value);
  };
 

  const NavigateTo = useNavigate()

 const customers = localStorage.getItem('customer')
 const customer = customers ? JSON.parse(customers) : null


  const handleSubmit = async(event:any) => {
    event.preventDefault();
    const feedbackText = event.target.feedbackText.value;
    console.log('Rating:', rating);
    console.log('Feedback Text:', feedbackText);
    // Reset form fields after submission (optional)
    setRating(0);
    event.target.reset(); // Reset the form
    try{
      const response = await AxiosApi.post(`/customer/feedback/${customer._id}/${product.order}`,{feed:feedbackText,rating:rating});
      console.log(response,"feedback response")
      toast.success(response.data.message)
      NavigateTo('/userdashboard')
    }catch(error){
        console.log(error)
        const errottos = error.response.data.message
        toast.error(errottos)
    }
  };

  return (
    <div>
      <div className="feedback-form max-w-xl mx-auto p-4 border rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Feedback Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center">
            <label htmlFor="rating" className="mr-2">Rating:</label>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((value) => (
                <React.Fragment key={value}>
                  <input
                    type="radio"
                    id={`star${value}`}
                    name="rating"
                    value={value}
                    className="sr-only"
                    onChange={() => handleRatingChange(value)}
                  />
                  <label
                    htmlFor={`star${value}`}
                    className={`text-2xl cursor-pointer ${
                      value <= rating ? 'text-yellow-500' : 'text-gray-400'
                    }`}
                  >
                    &#9733;
                  </label>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="feedbackText" className="mb-2">Feedback:</label>
            <textarea id="feedbackText" name="feedbackText" className="border rounded-md p-2"></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedbacks;
