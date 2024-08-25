import React, { useEffect, useState } from "react";
import CenterComponent from "../component/CenterComponent";
import Header from "../component/Header";
import Sidebar from "../component/Sidebar";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const [product, setProduct] = useState([]);

  const { id } = useParams();
  console.log(id);
  console.log(product);
  useEffect(() => {
    const fetched = async () => {
      const response = await fetch(
        `http://127.0.0.1:8000/centroApp/selectedProduct/${id}`
      );
      const data = await response.json();
      setProduct(data);
    };
    fetched();
  }, []);

  const productEl = (
    <div className='border-2 rounded-xl w-[30rem] h-40'>
      <div className='flex justify-around items-center w-full h-full'>
        <div className='p-2 border-red-600 w-[30%] h-full'>
          <img
            className='w-full h-full'
            src={`http://127.0.0.1:8000${product.image}`}
            alt='product'
          />
        </div>
        <div className='w-[50%]'>
          <p className='font-mono text-3xl'>{product.name}</p>
          <p className='my-2 text-xl'>{product.description}</p>
          <p className='my-2 font-bold text-slate-500'>Rs.{product.price}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Header />
      <div className='flex gap-5'>
        <Sidebar />
        <p>Product info</p>
        {productEl}
      </div>
    </div>
  );
};

export default ProductPage;
