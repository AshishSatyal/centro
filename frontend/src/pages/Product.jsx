import React, { useEffect, useState } from "react";
import CenterComponent from "../component/CenterComponent";
import { Link } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);
  console.log(products);

  const productEl = products?.map((product) => {
    return (
      <Link to={`product/${product.id}`}>
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
              <p className='my-2 font-bold text-slate-500'>
                Rs.{product.price}
              </p>
            </div>
          </div>
        </div>
      </Link>
    );
  });
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://127.0.0.1:8000/centroApp/Product/");
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div className='flex flex-col justify-around items-center gap-5 mt-5 p-4 border w-[40%]'>
      {productEl}
      {productEl}
    </div>
  );
};

export default Product;
