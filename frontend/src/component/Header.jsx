import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className='top-0 left-0 sticky bg-white/40 px-4 border w-full h-16 md:h-24'>
      <div className='flex justify-between items-center md:px-4 h-full'>
        <h1 className='font-bold text-2xl text-slate-500 lg:text-4xl capitalize'>
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
        <div className='md:flex md:gap-5 sm:hidden'>
          <Link
            to='/signup'
            className='flex justify-center items-center border border-blue-500 hover:border-none rounded-xl w-24 md:w-36 h-10 md:h-14 font-semibold text-black text-sm md:text-xl transition-all'
          >
            Sign Up
          </Link>
          <Link
            to='/signup'
            className='flex justify-center items-center border border-blue-500 hover:border-none rounded-xl w-24 md:w-36 h-10 md:h-14 font-semibold text-black text-sm md:text-xl transition-all'
          >
            Add product
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
