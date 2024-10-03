import React, { useEffect, useState } from "react";
import useAxios from "../util/axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductItem from "../component/ProductItem";
import { MdDelete } from "react-icons/md";

const YourProducts = () => {
  const axiosInstance = useAxios();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get("/centroApp/userProductView/");
        setProduct(response.data);

        if (response.status === 200) {
          toast.success("Product fetched succesfully");
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchProduct();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(
        `/centroApp/userProductDeleteView/${id}`
      );
      if (response.status === 204) {
        setProduct((prevProduct) =>
          prevProduct.filter((item) => item.id !== id)
        );
        toast.success("Product Deleted Succesfully");
      }
    } catch (err) {
      console.log("error:", err);
    }
  };
  const productEl = product.map((item) => {
    return (
      <div className='flex mt-4'>
        <div className='relative'>
          <ProductItem product={item} key={item.id} />
          <MdDelete
            onClick={() => {
              handleDelete(item.id);
            }}
            className='top-4 right-4 absolute text-xl cursor-pointer'
          />
        </div>
      </div>
    );
  });
  return (
    <div>
      {productEl}
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

export default YourProducts;
