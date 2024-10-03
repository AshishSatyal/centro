import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useUser } from "../context/UserContext";

const Layout = () => {
  const { setUserDetails, userDetail } = useUser();
  function getLocation() {
    let _values = {};
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      _values = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      setUserDetails(() => ({
        ...userDetail,
        location: _values,
      }));
    });
    return _values;
  }
  useEffect(() => {
    getLocation();
  }, []);
  return (
    <div className='flex flex-col gap-16'>
      <div>
        <Header />
      </div>
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
