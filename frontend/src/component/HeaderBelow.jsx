import React, { useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom"; // useNavigate instead of redirect
import useAxios from "../util/axios";
import { useUser } from "../context/UserContext";
import { FaSave, FaDollarSign } from "react-icons/fa";

const HeaderBelow = () => {
  const { userDetail } = useUser();
  const [url, setUrl] = useState("");
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const handleMembership = async () => {
    try {
      const response = await axiosInstance.post(
        "/centroApp/premium/membership/purchase/"
      );

      if (response.status === 200) {
        const paymentUrl = response.data.payment_url;
        setUrl(paymentUrl);
        window.location.href = paymentUrl;
      }
    } catch (error) {
      console.log("Error fetching membership URL", error);
    }
  };
  // console.log(url);

  return (
    <div className='flex justify-end items-center gap-8 bg-white shadow-xl pr-5 border-black rounded-lg w-full h-14'>
      <Link
        to={"/saved-product"}
        className='relative border-2 hover:border-gray-400 py-1 pl-2 border-black rounded-xl md:w-36 h-10 font-regular text-black text-center text-sm md:text-xl'
      >
        Saved
        <FaSave className='top-2 left-2 absolute' />
      </Link>
      <button
        onClick={handleMembership}
        className='relative border-2 hover:border-gray-400 py-1 pl-2 border-black rounded-xl md:w-36 h-10 font-regular text-black text-center text-sm md:text-xl'
      >
        {userDetail?.is_member ? "Activated" : "Go Premium"}

        {userDetail?.is_member ? (
          <FaDollarSign className='top-2 left-1 absolute' />
        ) : (
          ""
        )}
      </button>
    </div>
  );
};

export default HeaderBelow;
