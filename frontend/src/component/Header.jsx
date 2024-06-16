import React from "react";

const Header = () => {
  return (
    <div className='top-0 left-0 sticky bg-white/40 px-4 border w-full h-24'>
      <div className='flex justify-between items-center px-4 h-full'>
        <h1 className='font-bold text-slate-500 sm:text-2xl lg:text-4xl capitalize'>
          centro
        </h1>
        <div>
          <input
            type='search'
            name=''
            id=''
            placeholder='search'
            className='p-2 border-b-2 w-52'
          />
        </div>
        <div className='flex gap-5'>
          <button className='border-2 border-blue-500 rounded-xl w-32 h-14 font-semibold text-black'>
            Sign Up
          </button>
          <button className='bg-blue-500 border rounded-xl w-32 h-14 text-white'>
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
