import React, { useState } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import AxiosApi from "../AxiosApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface register {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const Signin = () => {
  const NavigateTo = useNavigate();

  const [data, setdata] = useState<register>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [role, setrole] = useState<string>("");

  const handlechage = (e: any) => {
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
  };

  const registerForAll = async (e: any) => {
    e.preventDefault();
    console.log(data, "datsas");

    try {
      if (role === "owner") {
        const response = await AxiosApi.post("/owner/register", data);
        console.log(response, "response");
        toast.success(response.data.message);
        NavigateTo("/signin");
      } else if (role == "customer") {
        const response = await AxiosApi.post("/customer/register", data);
        console.log(response, "gfrsn");
        toast.success(response.data.message);
        NavigateTo("/signin");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <Nav />
      <section className="flex flex-col md:flex-row h-screen items-center">
        <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
          <img src="34.png" alt="" className="w-full h-full object-cover" />
        </div>
        <div
          className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
  flex items-center justify-center"
        >
          <div className="w-full h-100">
            <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
              Sign Up to your account
            </h1>
            <div className="mt-6">
              <label htmlFor="userType" className="block text-gray-700">
                Select
              </label>
              <select
                onChange={(e: any) => setrole(e.target.value)}
                id="userType"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              >
                <option value="">Select Role</option>
                <option value="owner">Owner</option>
                <option value="customer">Customer</option>
              </select>
            </div>

            <form className="mt-6" onSubmit={registerForAll}>
              <div>
                <label className="block text-gray-700">FristName</label>
                <input
                  type="text"
                  name="firstName"
                  id=""
                  required
                  onChange={handlechage}
                  placeholder="Enter first Address"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  autoComplete=""
                />
              </div>
              <div>
                <label className="block text-gray-700">Lastname</label>
                <input
                  type="text"
                  name="lastName"
                  id=""
                  required
                  onChange={handlechage}
                  placeholder="Enter last Address"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  autoComplete=""
                />
              </div>
              <div>
                <label className="block text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  id=""
                  required
                  onChange={handlechage}
                  placeholder="Enter Email Address"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  autoComplete=""
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  id=""
                  required
                  onChange={handlechage}
                  placeholder="Enter Password"
                  minLength={6}
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
          focus:bg-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
        px-4 py-3 mt-6"
              >
                SIGN UP
              </button>
            </form>
            <hr className="my-6 border-gray-300 w-full" />

            <p className="mt-8">
              Already an account?{" "}
              <Link
                to="/signin"
                className="text-blue-500 hover:text-blue-700 font-semibold"
              >
                Login account
              </Link>
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Signin;
