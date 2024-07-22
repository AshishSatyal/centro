import React from "react";
import { useForm } from "react-hook-form";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await fetch("http://127.0.0.1:8000/centroApp/requestReset/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className='flex flex-col justify-center items-center w-full h-[100vh]'>
      <h1 className='font-semibold text-4xl capitalize'>forgot password</h1>
      <div className='my-2 px-10 rounded-xl boxShadow'>
        <form className='my-8' onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col justify-center items-center gap-3 h-full'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='email'>Email</label>
              <input
                {...register("email", {
                  required: "This input is required",
                })}
                className='focus:border-gray-800 px-2 border border-black rounded-xl w-[15rem] h-10'
                type='email'
                name='email'
                id='email'
                placeholder='email'
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

export default ForgotPassword;
