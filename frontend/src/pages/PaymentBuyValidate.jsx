import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAxios from "../util/axios";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
// Assuming axiosInstance is exported from a separate file

const PaymentButValidate = () => {
  const { id, midpoint } = useParams();
  const [message, setMessage] = useState("");
  const location = useLocation(); // To access query parameters
  const navigate = useNavigate(); // To navigate after successful payment validation
  const axiosInstance = useAxios();

  const query = new URLSearchParams(location.search);
  const pidx = query.get("pidx");
  const status = query.get("status");

  console.log(id, midpoint);

  useEffect(() => {
    const validate = async () => {
      try {
        // Make the request with query parameters properly attached
        const response = await axiosInstance.get(
          `/centroApp/validate-payment/${pidx}/${status}/`,
          {
            params: {
              product_id: id,
              quantity: 1,
              midpoint: midpoint,
            },
          }
        );

        if (response.status === 200) {
          toast.success("Purchase Complete! Mail sent");
          setMessage(
            "Purchase Confirmed! Please Check Your Mail for product details "
          );
        } else {
          setMessage("Payment validation failed.");
        }
      } catch (error) {
        console.error("Payment validation error:", error);
        setMessage("There was an error validating your payment.");
      }
    };

    validate();
  }, [pidx, status, navigate]);

  return (
    <>
      <ToastContainer />
      <div className='flex flex-col justify-center items-center w-full h-[100vh]'>
        <p className='pt-2 text-2xl text-slate-600'>{message}</p>
        <p className='pt-2 text-xl'>
          Kindly check meeting location for product pickup
        </p>
        <button
          className='bg-black mt-2 rounded-lg w-40 h-10 text-white'
          onClick={() => {
            navigate(`/product/${id}`);
          }}
        >
          Go Back
        </button>
      </div>
    </>
  );
};

export default PaymentButValidate;
