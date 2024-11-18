import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [backendError, setBackendError] = useState("");

  const onSubmit = async (data) => {
    setBackendError("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/centroApp/requestReset/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: data.email }), // Sending email from form data
        }
      );

      const result = await response.json();

      if (response.status === 200) {
        toast.success("Code sent to your email");
      }

      if (!response.ok) {
        // If the response status is not ok, throw an error with the message from the backend
        toast.warning("code not sent");
      }

      // Handle the successful response here
      console.log("Password reset request sent successfully:", result);
    } catch (err) {
      console.error("Error during password reset request:", err);
      setBackendError(err.message); // Show backend error message
    }
  };

  return (
    <div className='flex flex-col justify-center items-center w-full h-[100vh]'>
      <h1 className='font-semibold text-4xl capitalize'>Forgot Password</h1>
      <div className='my-2 px-10 rounded-xl boxShadow'>
        <form className='my-8' onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col justify-center items-center gap-3 h-full'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='email'>Email</label>
              <input
                {...register("email", {
                  required: "This input is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
                className='focus:border-gray-800 px-2 border border-black rounded-xl w-[15rem] h-10'
                type='email'
                name='email'
                id='email'
                placeholder='email'
              />
              {errors.email && (
                <span className='text-red-500'>{errors.email.message}</span>
              )}
            </div>
            {backendError && (
              <div className='mt-3 text-red-500'>{backendError}</div> // Display backend error
            )}
            <button className='border border-black rounded-xl w-[15rem] h-10'>
              Reset Password
            </button>
          </div>
        </form>
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
    </div>
  );
};

export default ForgotPassword;
