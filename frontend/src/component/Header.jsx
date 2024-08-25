import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className='top-0 left-0 sticky bg-white/40 px-4 w-full md:h-24 max-h-20 b'>
      <div className='flex justify-between items-center md:px-4 h-full'>
        <Link
          className='font-bold text-2xl text-slate-500 lg:text-4xl capitalize'
          to={"/"}
        >
          centro
        </Link>
        <div>
          <input
            type='search'
            name=''
            id=''
            placeholder='search'
            className='p-2 border-b-2 w-52'
          />
        </div>
        <div className='md:flex justify-center items-center md:gap-5 hidden'>
          <Link
            to='/signup'
            className='py-3 border border-blue-500 rounded-xl w-24 md:w-32 h-10 md:h-14 font-semibold text-center text-sm md:text-xl transition-all'
          >
            Sign Up
          </Link>
          <Link
            to='/add-product'
            className='py-3 border border-blue-500 rounded-xl w-24 md:w-32 h-10 md:h-14 font-semibold text-center text-sm md:text-xl transition-all'
          >
            Add product
          </Link>
          <Link
            to={"/"}
            className='premium-txt py-3 font-semibold text-center text-sm md:text-xl'
          >
            Go Premium
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
