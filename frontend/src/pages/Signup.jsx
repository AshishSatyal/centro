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
        <h1 className='text-4xl capitalize font-bold'>signup</h1>
        <div className='py-10 border'>
          <form action=''>
            <div className='flex gap-5 px-4'>
              <div className='flex flex-col gap-2'>
                <label className='' htmlFor='firstName'>
                  First Name
                </label>
                <input
                  type='text'
                  className='focus:border-gray-800 px-4 border border-black rounded-xl w-[15rem] h-10'
                  placeholder='John'
                  id='firstName'
                />
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor='lastName'>Last Name</label>
                <input
                  className='focus:border-gray-800 px-4 border border-black rounded-xl w-[15rem] h-10'
                  type='text'
                  placeholder='Doe'
                  id='lastName'
                />
              </div>
            </div>
            <button
              className='border border-black hover:border-black/40 rounded-xl w-40 h-10'
              onClick={handleForm}
              type='submit'
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </CenterComponent>
  );
};

export default Signup;
