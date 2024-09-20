import React from "react";

import Links from "./Links";

const Sidebar = () => {
  return (
    <div className='top-0 sticky px-8 pt-28 w-full min-h-screen'>
      <h3 className='border-b-2 text-2xl capitalize'>categories</h3>
      <div className='flex flex-col gap-5 py-4'>
        <Links name={"all products"} href={"/"} />
        <Links name={"electronics"} href={"/category/electronics"} />
        <Links name={"automobile"} href={"/category/electronics"} />
      </div>
    </div>
  );
};

export default Sidebar;
