import React from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  // Extract token from URL using URLSearchParams
  const url = window.location.href();
  const token = url.split("?").pop();
  console.log(token);

  const obj = {
    token: token,
  };

  const onSubmit = async (data) => {
    // Handle form submission
    if (data.new_password !== data.confirm_password) {
      setError("confirm_password", { message: "Passwords do not match" });
      return;
    }

    try {
      const combinedData = {
        ...obj,
        ...data,
      };
      const response = await fetch(
        "http://127.0.0.1:8000/centroApp/resetPassword/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(combinedData),
        }
      );

      const responseBody = await response.json(); // Ensure you parse the response

      if (response.status === 200) {
        toast.success(responseBody.message || "Password reset successful");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(responseBody.error || "Password reset failed");
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className='flex flex-col justify-center items-center w-full h-[100vh]'>
      <h1 className='font-semibold text-4xl capitalize'>Reset Password</h1>
      <div className='my-2 px-10 rounded-xl boxShadow'>
        <form className='my-8' onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col justify-center items-center gap-3 h-full'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='new_password'>Password</label>
              <input
                {...register("new_password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
                className='focus:border-gray-800 px-2 border border-black rounded-xl w-[15rem] h-10'
                type='password'
                name='new_password'
                id='new_password'
                placeholder='Password'
              />
              {errors.new_password && (
                <p className='text-red-500'>{errors.new_password.message}</p>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor='confirm_password'>Confirm Password</label>
              <input
                {...register("confirm_password", {
                  required: "Please confirm your password",
                })}
                className='focus:border-gray-800 px-2 border border-black rounded-xl w-[15rem] h-10'
                type='password'
                name='confirm_password'
                id='confirm_password'
                placeholder='Confirm Password'
              />
              {errors.confirm_password && (
                <p className='text-red-500'>
                  {errors.confirm_password.message}
                </p>
              )}
            </div>
            <button
              type='submit'
              className='border border-black rounded-xl w-[15rem] h-10'
              disabled={Object.keys(errors).length > 0} // Disable button if there are errors
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
      <ToastContainer /> {/* Add ToastContainer for toasts to show */}
    </div>
  );
};

export default ResetPassword;
