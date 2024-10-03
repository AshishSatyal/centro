import React from "react";
import { CiSaveDown2 } from "react-icons/ci";
import useAxios from "../util/axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SaveProduct = ({ id }) => {
  const axiosInstance = useAxios();

  const handleClick = async () => {
    try {
      const response = await axiosInstance.post(
        `/centroApp/products/${id}/save/`
      );

      // Check for successful response
      if (response.status === 201) {
        toast.success("Product added successfully!");
      }

      console.log("Product saved:", response.data);
    } catch (error) {
      console.error("Error saving product:", error);

      // Check if the error response is available and has a status code of 400
      if (error.response && error.response.status === 400) {
        const errorMessage =
          error.response.data.message || "An error occurred. Please try again.";
        toast.error(errorMessage);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div>
      <CiSaveDown2
        className='text-3xl cursor-pointer hover:scale-x-75 transition-all'
        onClick={handleClick}
      />
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default SaveProduct;
