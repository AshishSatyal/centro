import React, { useEffect, useState } from "react";
import useAxios from "../util/axios";
import ProductItem from "../component/ProductItem";
import { MdDelete } from "react-icons/md";
// import { toast } from "react-toastify";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Assuming you're using react-toastify for success notifications

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
    <div className='flex flex-col gap-5 border-x-2 p-10'>
      <h1 className='text-2xl capitalize'>saved products</h1>
      {saved?.map((item) => (
        <div className='relative flex w-fit' key={item.id}>
          <ProductItem product={item} />
          <MdDelete
            className='top-2 right-0 absolute text-xl cursor-pointer'
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
    </div>
  );
};

export default Saved;
