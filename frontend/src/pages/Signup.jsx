import React from "react";
import CenterComponent from "../component/CenterComponent";

const Signup = () => {
  const handleForm = (e) => {
    e.preventDefault();
    console.log("Form Submitted");
  };
  return (
    <CenterComponent>
      <div className='flex flex-col justify-center items-center border w-full h-[100vh]'>
        <h1 className='font-bold text-4xl capitalize'>signup</h1>
        <div className='py-5 border w-[25rem]'>
          <form action='' className='w-full'>
            <div className='flex flex-col gap-2'>
              <div className='flex gap-2 px-4'>
                <div className='flex flex-col gap-1'>
                  <label className='font-semibold' htmlFor='firstName'>
                    First Name
                  </label>
                  <input
                    type='text'
                    className='focus:border-gray-800 px-2 border border-black rounded-xl w-[11rem] h-10'
                    placeholder='John'
                    id='firstName'
                    name='firstname'
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <label htmlFor='lastName' className='font-semibold'>
                    Last Name
                  </label>
                  <input
                    className='focus:border-gray-800 px-2 border border-black rounded-xl w-[11rem] h-10'
                    type='text'
                    placeholder='Doe'
                    id='lastName'
                    name='lastname'
                  />
                </div>
              </div>
              <div className='flex flex-col gap-1 px-4'>
                <label htmlFor='email' className='font-semibold'>
                  Email
                </label>
                <input
                  className='focus:border-gray-800 px-2 border border-black rounded-xl w-[22rem] h-10'
                  type='text'
                  placeholder='example@gmail.com'
                  id='email'
                  name='email'
                />
              </div>
              <div className='flex flex-col gap-1 px-4'>
                <label htmlFor='number' className='font-semibold'>
                  Number
                </label>
                <input
                  className='focus:border-gray-800 px-2 border border-black rounded-xl w-[22rem] h-10 remove-arrow'
                  type='number'
                  placeholder='9812345678'
                  id='number'
                  name='number'
                />
              </div>
              <div className='flex flex-col gap-1 px-4'>
                <label htmlFor='password' className='font-semibold'>
                  Password
                </label>
                <input
                  className='focus:border-gray-800 px-2 border border-black rounded-xl w-[22rem] h-10'
                  type='password'
                  placeholder='********'
                  id='password'
                  name='password'
                />
              </div>
              <div className='flex flex-col gap-1 px-4'>
                <label htmlFor='confirm_password' className='font-semibold'>
                  Confirm Password
                </label>
                <input
                  className='focus:border-gray-800 px-2 border border-black rounded-xl w-[22rem] h-10'
                  type='password'
                  placeholder='********'
                  id='confirm_password'
                  name='confirm_password'
                />
              </div>
              <div className='mt-5 px-4'>
                <button
                  className='border border-black hover:border-black/40 rounded-xl w-[22rem] h-10 font-semibold text-xl'
                  onClick={handleForm}
                  type='submit'
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </CenterComponent>
  );
};

export default Signup;
