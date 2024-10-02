import React, { useEffect } from "react";
import { CiSaveDown2 } from "react-icons/ci";
import useAxios from "../util/axios";

const SaveProduct = ({ id }) => {
  const axiosInstance = useAxios();
  const handleClick = async () => {
    try {
      const response = await axiosInstance.post(
        `/centroApp/products/${id}/save/`
      );
      console.log("Product saved:", response.data);
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  return (
    <CiSaveDown2
      className='text-3xl cursor-pointer hover:scale-x-75 transition-all'
      onClick={handleClick}
    />
  );
};

export default SaveProduct;
