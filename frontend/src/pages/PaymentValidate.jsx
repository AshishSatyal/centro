import React, { useEffect, useState } from "react";
import { useParams, useLocation, Navigate } from "react-router-dom";
import useAxios from "../util/axios";

const PaymentValidate = () => {
  const axiosInstance = useAxios();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const validate = async () => {
      const response = await axiosInstance.get(
        `/centroApp/premium/membership/success/${pidx}/${status}`
      );
      setMessage(response.data.status);
    };
    validate();
  }, []);

  console.log(message);
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  // Example: getting a specific query parameter
  const pidx = query.get("pidx");
  const status = query.get("status");
  console.log(pidx, status);
  return (
    <div>
      <h1>validate</h1>
    </div>
  );
};

export default PaymentValidate;
