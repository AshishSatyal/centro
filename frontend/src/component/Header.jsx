import React from "react";

const Header = () => {
  return (
    <div className='top-0 left-0 sticky bg-white/40 px-4 border w-full h-24'>
      <div className='flex justify-between items-center px-4 h-full'>
        <h1 className='font-bold text-slate-500 sm:text-2xl lg:text-4xl capitalize'>
          centro
        </h1>
        {/* <div>
          <input
            type='search'
            name=''
            id=''
            placeholder='search'
            className='p-2 border-b-2 w-52'
          />
        </div> */}
        <div className='flex gap-5'>
          <button className='hover:bg-blue-500 border border-blue-500 hover:border-none rounded-xl w-36 h-14 font-semibold text-black text-xl hover:text-white transition-all'>
            Sign Up
          </button>
          <button className='bg-blue-500 hover:bg-white border border-blue-500 rounded-xl w-36 h-14 text-white text-xl hover:text-black transition-all'>
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
