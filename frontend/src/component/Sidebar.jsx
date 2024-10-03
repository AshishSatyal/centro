import React from "react";

import Links from "./Links";
import Category from "../pages/Category";

const Sidebar = () => {
  return (
    <div className='top-0 sticky px-8 pt-28 w-full min-h-screen'>
      <h3 className='border-b-2 text-2xl capitalize'>categories</h3>
      <div className='flex flex-col gap-5 py-4'>
        <Links name={"all products"} href={"/"} />
        <Links name={"phones"} href={`/category/phone`} />
        <Links name={"automobile"} href={"/category/automobile"} />
        <Links name={"instrument"} href={"/category/instrument"} />
        <Links name={"fitness"} href={"/category/fitness"} />
        <Links name={"Books"} href={"/category/books"} />
      </div>
    </div>
  );
};

export default Sidebar;
