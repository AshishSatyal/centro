import React, { useState } from "react";
import CenterComponent from "../component/CenterComponent";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import loginImage from "../assets/undraw.svg";

const Login = () => {
  const { setTokens } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/centroApp/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        const { access, refresh } = result;
        toast.success("Login successful! Redirecting to Home...");
        setTokens({ access, refresh });

        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        const errorData = await response.json();
        setError("email", {
          message: errorData.detail || "Invalid email or password",
        });
        setError("password", {
          message: errorData.detail || "Invalid email or password",
        });
      }
    } catch (err) {
      setError("email", {
        message: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <CenterComponent>
      <div className='flex lg:flex-row flex-col justify-center items-center w-full h-[100vh]'>
        <div className='flex flex-1 justify-center items-center'>
          <img
            src={loginImage}
            alt='Login Illustration'
            className='w-full max-w-md h-auto'
          />
        </div>
        <div className='flex flex-col flex-1 justify-center items-center'>
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
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email format",
                      },
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
                  <div className='relative'>
                    <input
                      className='focus:border-gray-800 px-2 border border-black rounded-xl w-[15rem] h-10'
                      {...register("password", {
                        required: "This input is required",
                        minLength: {
                          // value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                      type={showPassword ? "text" : "password"}
                      name='password'
                      id='password'
                      placeholder='password'
                    />
                    <button
                      type='button'
                      className='top-1/2 right-2 absolute transform -translate-y-1/2'
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && (
                    <div className='font-semibold text-red-600 text-sm'>
                      {errors.password.message}
                    </div>
                  )}
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

export default Login;
