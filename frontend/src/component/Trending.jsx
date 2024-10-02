import React, { useEffect, useState } from "react";
import useAxios from "../util/axios";
import { Link } from "react-router-dom";

const Trending = () => {
  const axiosInstance = useAxios();
  const [trendingProducts, setTrendingProducts] = useState([]);

  useEffect(() => {
    const fetchedProducts = async () => {
      const response = await axiosInstance.get("/centroApp/Product/");

      setTrendingProducts(response.data);
    };
    fetchedProducts();
  }, []);

  const productEl = trendingProducts?.map((product) => {
    return (
      <Link to={`/product/${product.id}`}>
        <div className='border rounded-xl w-full h-40'>
          <div className='flex justify-center items-center gap-4 w-full h-full'>
            <div className='p-2 border-red-600 w-[40%] h-full'>
              <img
                className='w-full h-full'
                src={`http://127.0.0.1:8000${product.image}`}
                alt='product'
              />
            </div>
            <div className='w-[40%]'>
              <p className='text-xl'>{product.name}</p>
              {/* <p className='my-2 text-xl'>{product.description}</p> */}
              <p className='my-2 font-semi text-slate-500'>
                Rs.{product.price}
              </p>
            </div>
          </div>
        </div>
      </Link>
    );
  });
  return (
    <div className='flex flex-col gap-2 py-4'>
      <h1 className='my-2 pb-2 border-b-2 text-black text-xl'>
        Trending products
      </h1>
      {productEl}
    </div>
  );
};

export default Trending;
