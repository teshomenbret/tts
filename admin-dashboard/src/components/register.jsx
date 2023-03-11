import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { hideLoading, showLoading } from "../redux/alertsSlice";
// import logo from "../Assets/sign-upimg.svg";
const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/register", values);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };
  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <div className='absolute h-full w-full bg-gradient-to-r from-blue-400 to-purple-600'>
        <div className='absolute inset-0 w-full h-full'>
          <div className='h-full w-full bg-transparent flex justify-center items-center'>
            <div className='w-100 z-10 bg-white rounded-lg p-8'>
              <h2 className='text-2xl font-bold mb-4'>CREATE ADMIN ACCOUNT </h2>
              <form className='space-y-6' onSubmit={onFinish}>
                <div className='flex flex-col'>
                  <label htmlFor="name" className='text-sm font-medium'>First Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className='border rounded-lg p-2'
                  />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor="lastName" className='text-sm font-medium'>Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    className='border rounded-lg p-2'
                  />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor="email" className='text-sm font-medium'>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete='false'
                    className='border rounded-lg p-2'
                  />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor="password" className='text-sm font-medium'>
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className='border rounded-lg p-2'
                  />
                </div>
                <button
                  type="submit"
                  className='bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50'
                >
                  Sign Up
                </button>
                <Link to="/login" className="anchor mt-2">
                  have an account? Sign In
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
