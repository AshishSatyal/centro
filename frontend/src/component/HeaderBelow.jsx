import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // useNavigate instead of redirect
import useAxios from "../util/axios";

const HeaderBelow = () => {
  const [url, setUrl] = useState("");
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const handleMembership = async () => {
    try {
      const response = await axiosInstance.post(
        "/centroApp/premium/membership/purchase/"
      );
      console.log("clicking");

      if (response.status === 200) {
        setUrl(response.data);
        // navigate(response.data); // navigate to the fetched URL
      }
    } catch (error) {
      console.log("Error fetching membership URL", error);
    }
  };

  return (
    <div className='flex justify-end items-center gap-8 bg-white shadow-xl pr-5 border-black rounded-lg w-full h-14'>
      <Link
        to={"/saved-product"}
        className='border-2 hover:border-gray-400 py-1 border-black rounded-xl md:w-36 h-10 font-regular text-black text-center text-sm md:text-xl'
      >
        Saved
      </Link>
      <button
        onClick={handleMembership}
        className='border-2 hover:border-gray-400 py-1 border-black rounded-xl md:w-36 h-10 font-regular text-black text-center text-sm md:text-xl'
      >
        Go Premium
      </button>
    </div>
  );
};

export default HeaderBelow;
