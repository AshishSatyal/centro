import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div>
      <Header />
      <div className='flex gap-2'>
        <div className='relative w-1/5'>
          <Sidebar />
        </div>
        <div className='mt-20 w-4/5'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
