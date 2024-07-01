import React from "react";

const NavSmall = () => {
  return (
    <div className='flex justify-center items-center bg-black px-4 rounded-3xl w-full h-16'>
      <div className='flex justify-between items-center gap-2 text-white'>
        <h1>home</h1>
        <h1>anything</h1>
        <h1>Add product</h1>
        <h1>Product history</h1>
        <h1>Profile</h1>
      </div>
    </div>
  );
};

export default NavSmall;
