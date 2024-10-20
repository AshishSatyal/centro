import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import useAxios from "../util/axios";

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
        setTimeout(() => {
          navigate("/");
        }, 1000);
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
    <div className='flex justify-center items-center w-full h-[100vh]'>
      <h1>{message}</h1>
    </div>
  );
};

export default PaymentValidate;
