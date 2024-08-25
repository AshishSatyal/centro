import React from "react";

import Links from "./Links";

const Sidebar = () => {
  return (
    <div className='px-8 w-[25%]'>
      <h3 className='my-4 font-semibold text-3xl capitalize'>categories</h3>
      <div className='flex flex-col justify-center items-center gap-5 py-4'>
        <Links name={"all products"} href={"/"} />
        <Links name={"electronics"} href={"/category/electronics"} />
        <Links name={"auto mobils"} href={"/category/electronics"} />
        <Links name={"auto mobils"} href={"/category/electronics"} />
        <Links name={"auto mobils"} href={"/category/electronics"} />
        <Links name={"auto mobils"} href={"/category/electronics"} />
        <Links name={"auto mobils"} href={"/category/electronics"} />
      </div>
    </div>
  );
};

export default Sidebar;
