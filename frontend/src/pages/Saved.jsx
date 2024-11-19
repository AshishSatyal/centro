import React, { useEffect, useState } from "react";
import useAxios from "../util/axios";
import ProductItem from "../component/ProductItem";
import { MdDelete } from "react-icons/md";
// import { toast } from "react-toastify";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Trending from "../component/Trending";

const Saved = () => {
  const [saved, setSaved] = useState([]);
  const axiosInstance = useAxios();

  useEffect(() => {
    const fetchSavedProduct = async () => {
      try {
        const response = await axiosInstance.get(`/centroApp/saved-items/`);
        setSaved(response.data);
      } catch (err) {
        console.error("Error fetching saved products", err);
      }
    };
    fetchSavedProduct();
  }, []);

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const response = await axiosInstance.delete(
        `/centroApp/saved-item/${id}/delete/`
      );
      if (response.status === 204) {
        toast.success("Product removed successfully!");

        // Update the saved array to remove the deleted item
        setSaved((prevSaved) => prevSaved.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error("Error deleting product", err);
      toast.error("Failed to remove product.");
    }
  };

  return (
    <>
      <h1 className='mt-5 text-2xl capitalize'>saved products</h1>
      <div className='flex justify-between items-start gap-5 border-x-2 mt-5 p-2'>
        {saved?.map((item) => (
          <div className='relative flex w-fit' key={item.id}>
            <ProductItem product={item} />
            <MdDelete
              className='top-2 right-2 absolute text-xl cursor-pointer'
              onClick={() => handleDelete(item.id)}
            />
          </div>
        ))}
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
        <div className='w-[40%]'>
          <Trending />
        </div>
      </div>
    </>
  );
};

export default Saved;
