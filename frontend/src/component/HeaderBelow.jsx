import React from "react";
import { Link } from "react-router-dom";

const HeaderBelow = () => {
  return (
    <div className='flex justify-end items-center gap-8 bg-black/80 pr-5 rounded-lg w-full h-16'>
      <Link
        to={"/saved-product"}
        className='border-2 border-white hover:border-gray-400 py-2 rounded-xl md:w-36 font-regular text-center text-sm text-white md:text-xl'
      >
        Saved
      </Link>
      <Link
        to={"/"}
        className='border-2 border-white hover:border-gray-400 premium-txt py-2 rounded-xl md:w-36 font-regular text-center text-sm md:text-xl'
      >
        Go Premium
      </Link>
    </div>
  );
};

export default HeaderBelow;
