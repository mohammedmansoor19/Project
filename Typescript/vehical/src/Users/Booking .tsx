import React, { useState, useEffect } from 'react';
import AxiosApi from '../AxiosApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface BookingType {
  Username: string;
  Useremmail: string;
  UserphoneNumber: string;
  hours: number;
  amount: number;
  totalamount: number;
  date: Date | null;
  DriverName: string;
  DriverAge: number;
}

const Booking = ({ productId }: { productId: any }) => {
  const [withOutDriver, setWithOutDriver] = useState(false);
  const [data, setData] = useState<BookingType>({
    Username: '',
    Useremmail: '',
    UserphoneNumber: '',
    hours: 0,
    amount: 0,
    totalamount: 0,
    date: null,
    DriverName: '',
    DriverAge: 0,
  });
  const [license, setLicense] = useState<File | null>(null);

  // Handle checkbox change
  const handleWithDriverChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWithOutDriver(event.target.checked);
    // Reset driver-related fields when toggling the checkbox
    if (event.target.checked) {
      setData((prevData) => ({
        ...prevData,
        DriverName: '',
        DriverAge: 0,
      }));
    }
  };

  // Handle input changes for text and number fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


const NavigateTo = useNavigate()

  

  // Handle date input change
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    setData((prevData) => ({
      ...prevData,
      date: selectedDate,
    }));
  };

  // Handle file input change for license
  const handleLicenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setLicense(file);
  };

  // Calculate total amount whenever hours or amount changes
 
  
  const ownersting = localStorage.getItem('customer')
  const owner = ownersting ? JSON.parse(ownersting) : null;
  // Handle form submission
  const submitTheBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(data)
    const formData = new FormData();
  //  formData.append('license', license as File);
    formData.append('Username', data.Username);
    formData.append('Useremmail', data.Useremmail);
    formData.append('UserphoneNumber', data.UserphoneNumber);
    formData.append('hours', data.hours.toString());
    if (data.date) {
      formData.append('date', data.date.toISOString());
    }

    if (!withOutDriver) {
      // Include driver-related fields when withOutDriver is false
      formData.append('DriverType', 'withdriver'); // Indicates booking with driver
      formData.append('amount' , parseFloat(productId.driverAmount).toString())
      formData.append('totalamount', (parseFloat(productId.driverAmount) * data.hours).toString());
    } else {
      formData.append('DriverName', data.DriverName);
      formData.append('DriverAge', data.DriverAge.toString());
      formData.append('DriverType', 'withoutdriver'); // Indicates booking without driver
      formData.append('Lisence', license as File);
      formData.append('amount',productId.Amount );
      formData.append('totalamount', (productId.Amount * data.hours).toString());

    }

    try {
      const response = await AxiosApi.post(`/customer/book/${owner._id}/${productId._id}`, formData);
      console.log(response.data, "Booking response");
      toast.success(response.data.message)
      NavigateTo('/userdashboard')
      // Handle success or redirect
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-md shadow-lg border-zinc-900 mt-4">
      <h2 className="text-xl font-semibold mb-4">Booking</h2>
      <form onSubmit={submitTheBooking}>
        {/* Input fields for User Name, Email, Mobile Number, Date */}
        <div className="flex space-x-5">
          {/* User Name */}
          <div className="mb-4">
            <label htmlFor="Username" className="block text-sm font-medium text-gray-700">
              User Name
            </label>
            <input
              type="text"
              id="Username"
              name="Username"
              className="mt-1 p-2 border rounded-md w-full"
              value={data.Username}
              onChange={handleInputChange}
              required
            />
          </div>
          {/* User Email */}
          <div className="mb-4">
            <label htmlFor="Useremmail" className="block text-sm font-medium text-gray-700">
              User Email
            </label>
            <input
              type="text"
              id="Useremmail"
              name="Useremmail"
              className="mt-1 p-2 border rounded-md w-full"
              value={data.Useremmail}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        {/* Mobile Number and Date */}
        <div className="flex space-x-5">
          {/* Mobile Number */}
          <div className="mb-4">
            <label htmlFor="UserphoneNumber" className="block text-sm font-medium text-gray-700">
              Mobile Number
            </label>
            <input
              type="text"
              id="UserphoneNumber"
              name="UserphoneNumber"
              className="mt-1 p-2 border rounded-md w-full"
              value={data.UserphoneNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          {/* Date */}
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              className="mt-1 p-2 border rounded-md w-full"
              value={data.date ? data.date.toISOString().substr(0, 10) : ''}
              onChange={handleDateChange}
              required
            />
          </div>
        </div>
        {/* Checkbox for Driver */}
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox mr-2"
              checked={withOutDriver}
              onChange={handleWithDriverChange}
            />
            Without Driver
          </label>
        </div>
        {/* Driver Details (shown when With Driver checkbox is checked) */}
        {withOutDriver && (
          <div className="flex space-x-6">
            {/* Driver Name */}
            <div className="mb-4">
              <label htmlFor="DriverName" className="block text-sm font-medium text-gray-700">
                Driver Name
              </label>
              <input
                type="text"
                id="DriverName"
                name="DriverName"
                className="mt-1 p-2 border rounded-md w-full"
                value={data.DriverName}
                onChange={handleInputChange}
                required
              />
            </div>
            {/* Driver Age */}
            <div className="mb-4">
              <label htmlFor="DriverAge" className="block text-sm font-medium text-gray-700">
                Driver Age
              </label>
              <input
                type="number"
                id="DriverAge"
                name="DriverAge"
                className="mt-1 p-2 border rounded-md w-full"
                value={data.DriverAge.toString()}
                onChange={handleInputChange}
                required
              />
            </div>
            {/* Driver License Image */}
            <div className="mb-4">
              <label htmlFor="driverLicenseImage" className="block text-sm font-medium text-gray-700">
                Driver License Image
              </label>
              <input
                type="file"
                id="driverLicenseImage"
                name="driverLicenseImage"
                className="mt-1 p-2 border rounded-md w-full"
                onChange={handleLicenseChange}
                required
              />
            </div>
          </div>
        )}
        {/* Hours, Amount, and Total Amount */}
        <div className="flex space-x-5">
          {/* Hours */}
          <div className="mb-4">
            <label htmlFor="hours" className="block text-sm font-medium text-gray-700">
              Hours
            </label>
            <input
              type="number"
              id="hours"
              name="hours"
              className="mt-1 p-2 border rounded-md w-full"
              value={data.hours.toString()}
              onChange={handleInputChange}
              required
            />
          </div>
          {/* Amount (per hour) */}
          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Amount (per hour)
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              className="mt-1 p-2 border rounded-md w-full"
              
              onChange={()=>handleInputChange}
              value={withOutDriver ? productId.Amount : productId.driverAmount}
            />
          </div>
          {/* Total Amount */}
          <div className="mb-4">
            <label htmlFor="totalamount" className="block text-sm font-medium text-gray-700">
              Total Amount
            </label>
            <input
              type="text"
              id="totalamount"
              name="totalamount"
              className="mt-1 p-2 border rounded-md w-full"
              value={withOutDriver ? productId.Amount * data.hours : productId.driverAmount * data.hours}
              onChange={()=>handleInputChange}
              
            />
          </div>
        </div>
        {/* Submit Button */}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Book
        </button>
      </form>
    </div>
  );
};

export default Booking;
