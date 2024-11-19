import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import useAxios from "../util/axios";
import { toast, ToastContainer } from "react-toastify";

const PaymentValidate = () => {
  const axiosInstance = useAxios();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const validate = async () => {
      const response = await axiosInstance.get(
        `/centroApp/premium/membership/success/${pidx}/${status}`
      );
      if (response.status === 200) {
        setMessage("Purchase Confirmed! You have premium feature for 1month");
        toast.success("Membership Purchased!");
      }
    };
    validate();
  }, []);

  console.log(message);
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  // getting a specific query parameter
  const pidx = query.get("pidx");
  const status = query.get("status");
  console.log(pidx, status);
  return (
    <div className='flex flex-col justify-center items-center w-full h-[100vh]'>
      <h1 className='text-xl'>{message}!</h1>
      <button
        className='border-4 hover:bg-black mt-4 p-2 rounded-xl w-40 h-14 text-xl hover:text-white transition-all'
        onClick={() => {
          navigate("/");
        }}
      >
        Go Back
      </button>
      <ToastContainer />
    </div>
  );
};

export default PaymentValidate;
