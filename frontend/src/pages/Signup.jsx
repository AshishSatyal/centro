import React from "react";
import CenterComponent from "../component/CenterComponent";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/centroApp/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        toast.success("Registration successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      setError("email", {
        message: "Email already exists",
      });
    }
  };
  return (
    <CenterComponent>
      <div className='flex flex-col justify-center items-center w-full h-[100vh]'>
        <h1 className='py-2 font-bold text-4xl capitalize'>signup</h1>
        <div className='rounded-xl w-[20rem] lg:w-[25rem] boxShadow'>
          <form className='py-5 w-full' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-2'>
              <div className='flex gap-2 px-4'>
                <div className='flex flex-col gap-1'>
                  <label className='font-semibold' htmlFor='firstName'>
                    First Name
                  </label>
                  <input
                    {...register("firstname", {
                      required: "This input is required",
                      pattern: /^[A-Za-z]+$/i,
                      // message: "This input is required",
                    })}
                    type='text'
                    className='focus:border-gray-800 px-2 border border-black rounded-xl w-[9rem] lg:w-[11rem] h-10'
                    placeholder='John'
                    id='firstName'
                    name='firstname'
                  />
                  {errors.firstname && (
                    <div className='font-semibold text-red-600 text-sm'>
                      {errors.firstname.message}
                    </div>
                  )}
                </div>
                <div className='flex flex-col gap-1'>
                  <label htmlFor='lastName' className='font-semibold'>
                    Last Name
                  </label>
                  <input
                    {...register("lastname", {
                      required: "This input is required",
                      pattern: /^[A-Za-z]+$/i,
                      // message: "This input is required",
                    })}
                    className='focus:border-gray-800 px-2 border border-black rounded-xl w-[9rem] lg:w-[11rem] h-10'
                    type='text'
                    placeholder='Doe'
                    id='lastName'
                    name='lastname'
                  />
                  {errors.lastname && (
                    <div className='font-semibold text-red-600 text-sm'>
                      {errors.lastname.message}
                    </div>
                  )}
                </div>
              </div>
              <div className='flex flex-col gap-1 px-4'>
                <label htmlFor='email' className='font-semibold'>
                  Email
                </label>
                <input
                  {...register("email", {
                    required: "email is not valid",
                    validate: (value) => {
                      if (!value.includes("@")) {
                        return "Email is not valid";
                      }
                      return true;
                    },
                  })}
                  className='focus:border-gray-800 px-2 border border-black rounded-xl w-[18rem] lg:w-[22rem] h-10'
                  type='text'
                  placeholder='example@gmail.com'
                  id='email'
                  name='email'
                />
                {errors.email && (
                  <div className='font-semibold text-red-600 text-sm'>
                    {errors.email.message}
                  </div>
                )}
              </div>
              <div className='flex flex-col gap-1 px-4'>
                <label htmlFor='number' className='font-semibold'>
                  Number
                </label>
                <input
                  {...register("number", {
                    required: "This number is not valid",
                    pattern: /^[0-9]{10}$/i,
                    maxLength: 10,
                    // message: "This number is not valid",
                  })}
                  className='focus:border-gray-800 px-2 border border-black rounded-xl w-[18rem] lg:w-[22rem] h-10 remove-arrow'
                  type='number'
                  placeholder='9812345678'
                  id='number'
                  name='number'
                />
                {errors.number && (
                  <div className='font-semibold text-red-600 text-sm'>
                    {errors.number.message}
                  </div>
                )}
              </div>
              <div className='flex flex-col gap-1 px-4'>
                <label htmlFor='password' className='font-semibold'>
                  Password
                </label>
                <input
                  {...register("password", {
                    required:
                      "Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters",
                    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,

                    minLength: {
                      value: 8,
                      message:
                        "Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters",
                    },
                  })}
                  className='focus:border-gray-800 px-2 border border-black rounded-xl w-[18rem] lg:w-[22rem] h-10'
                  type='password'
                  placeholder='********'
                  id='password'
                  name='password'
                />
                {errors.password && (
                  <div className='font-semibold text-red-600 text-sm'>
                    {errors.password.message}
                  </div>
                )}
              </div>
              <div className='flex flex-col gap-1 px-4'>
                <label htmlFor='confirm_password' className='font-semibold'>
                  Confirm Password
                </label>
                <input
                  {...register("confirm_password", {
                    required: "Password does not match",
                    validate: (value) =>
                      value === document.getElementById("password").value,
                    // message: "Password does not match",
                  })}
                  className='focus:border-gray-800 px-2 border border-black rounded-xl w-[18rem] lg:w-[22rem] h-10'
                  type='password'
                  placeholder='********'
                  id='confirm_password'
                  name='confirm_password'
                />
                {errors.confirm_password && (
                  <div className='font-semibold text-red-600 text-sm'>
                    {errors.confirm_password.message}
                  </div>
                )}
              </div>
              <div className='mt-5 px-4'>
                <button
                  className='border border-black hover:border-black/40 rounded-xl w-[18rem] lg:w-[22rem] h-10 font-semibold text-xl'
                  type='submit'
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
          <div className='mt-3 text-center'>
            <Link className='font-semibold text-sm' to='/login'>
              Already Signed Up? Login
            </Link>
            <Link to='/'>
              <p className='my-2 font-semibold text-sm'>
                Continue Without Registering
              </p>
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </CenterComponent>
  );
};

export default Signup;
