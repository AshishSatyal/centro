import React, { useContext } from "react";
import { useForm } from "react-hook-form";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const url = window.location.href;
  const token = url.split("?").pop();
  console.log(token);

  const obj = {
    token: token,
  };

  const onSubmit = async (data) => {
    try {
      const combinedData = {
        ...obj,
        ...data,
      };
      await fetch("http://127.0.0.1:8000/centroApp/resetPassword/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(combinedData),
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center w-full h-[100vh]'>
      <h1 className='font-semibold text-4xl capitalize'>reset password</h1>
      <div className='my-2 px-10 rounded-xl boxShadow'>
        <form className='my-8' onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col justify-center items-center gap-3 h-full'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='password'>Password</label>
              <input
                {...register("new_password", {
                  // required: "This input is required",
                })}
                className='focus:border-gray-800 px-2 border border-black rounded-xl w-[15rem] h-10'
                type='password'
                name='new_password'
                id='password'
                placeholder='password'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor='confirmPassword'>Confirm Password</label>
              <input
                {...register("confirm_password", {
                  // required: "This input is required",
                })}
                className='focus:border-gray-800 px-2 border border-black rounded-xl w-[15rem] h-10'
                type='password'
                name='confirm_password'
                id='confirm_password'
                placeholder='confirm password'
              />
            </div>
            <button className='border border-black rounded-xl w-[15rem] h-10'>
              reset password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
