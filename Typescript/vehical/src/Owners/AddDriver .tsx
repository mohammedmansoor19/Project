import React, { useState } from "react";
import AxiosApi from "../AxiosApi";
import { toast } from "react-toastify";

interface driver {
  driverName: string;
  age: number;
  experience: number;
}

const AddDriver = ({ product }: { product: any }) => {
  const [data, setdata] = useState<driver>({
    driverName: "",
    age: 0,
    experience: 0,
  });

  const [license, setlicense] = useState<File | null>(null);

  const handlechage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
  };

  const handlelisence = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files && e.target.files[0];
    setlicense(files);
  };
  // const owners = localStorage.getItem('owner')
  // const owner = owners ? JSON.parse(owners) : null;

  const Doctor = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("status", "accept");
    formdata.append("DriverName", data.driverName);
    formdata.append("Lisence", license as File);
    formdata.append("DriverAge", data.age.toString());
    try {
      const response = await AxiosApi.put(
        `/owner/status/${product._id}`,
        formdata
      );
      console.log(response, "respon");
      toast.success("driver Add success");
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md mt-4">
      <h2 className="text-xl font-semibold mb-4">Add Driver Details</h2>
      <form onSubmit={Doctor}>
        <div className="mb-4">
          <label
            htmlFor="driverName"
            className="block text-sm font-medium text-gray-700"
          >
            Driver Name
          </label>
          <input
            type="text"
            id="driverName"
            name="driverName"
            className="mt-1 p-2 border rounded-md w-full"
            required
            onChange={handlechage}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700"
          >
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            className="mt-1 p-2 border rounded-md w-full"
            required
            onChange={handlechage}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="experience"
            className="block text-sm font-medium text-gray-700"
          >
            Experience (in years)
          </label>
          <input
            type="number"
            id="experience"
            name="experience"
            className="mt-1 p-2 border rounded-md w-full"
            required
            onChange={handlechage}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="license"
            className="block text-sm font-medium text-gray-700"
          >
            License
          </label>
          <input
            type="file"
            id="license"
            name="license"
            className="mt-1 p-2 border rounded-md w-full"
            required
            onChange={handlelisence}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddDriver;
