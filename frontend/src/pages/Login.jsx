import React from "react";
import CenterComponent from "../component/CenterComponent";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await fetch("http://127.0.0.1:8000/centroApp/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (err) {
      setError("email", {
        message: "Invalid email or password",
      });
    }
  };
  return (
    <CenterComponent>
      <div className='flex flex-col justify-center items-center w-full h-[100vh]'>
        <h1 className='font-semibold text-4xl capitalize'>login</h1>
        <div className='my-2 px-10 rounded-xl boxShadow'>
          <form className='my-8' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col justify-center items-center gap-3 h-full'>
              <div className='flex flex-col gap-2'>
                <label htmlFor='email'>Email</label>
                <input
                  className='focus:border-gray-800 px-2 border border-black rounded-xl w-[15rem] h-10'
                  {...register("email", {
                    required: "This input is required",
                  })}
                  type='email'
                  name='email'
                  id='email'
                  placeholder='email'
                />
                {errors.email && (
                  <div className='font-semibold text-red-600 text-sm'>
                    {errors.email.message}
                  </div>
                )}
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor='password'>Password</label>
                <input
                  className='focus:border-gray-800 px-2 border border-black rounded-xl w-[15rem] h-10'
                  {...register("password", {
                    required: "This input is required",
                  })}
                  type='password'
                  name='password'
                  id='password'
                  placeholder='password'
                />
              </div>
              <div>
                <button className='hover:border-slate-500 my-5 border border-black rounded-xl w-[15rem] h-10'>
                  Login
                </button>
              </div>
            </div>
          </form>
          <div className='flex flex-col text-center'>
            <Link to='/forgotpassword'>Forgot password?</Link>
            <Link className='my-2 font-semibold text-xl' to='/signup'>
              Register
            </Link>
          </div>
        </div>
      </div>
    </CenterComponent>
  );
};

export default Login;
