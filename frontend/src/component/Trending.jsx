import React, { useEffect, useState } from "react";

const Trending = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);

  useEffect(() => {
    const fetchedProducts = async () => {
      const response = await fetch("http://127.0.0.1:8000/centroApp/Product/");
      const data = await response.json();
      setTrendingProducts(data);
    };
    fetchedProducts();
  }, []);

  const productEl = trendingProducts?.map((product) => {
    return (
      <div className='border rounded-xl w-[80%] h-40'>
        <div className='flex justify-center items-center gap-4 w-full h-full'>
          <div className='p-2 border-red-600 w-[30%] h-full'>
            <img
              className='w-full h-full'
              src={`http://127.0.0.1:8000${product.image}`}
              alt='product'
            />
          </div>
          <div className='w-[40%]'>
            <p className='font-mono text-3xl'>{product.name}</p>
            {/* <p className='my-2 text-xl'>{product.description}</p> */}
            <p className='my-2 font-bold text-slate-500'>Rs.{product.price}</p>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div className='flex flex-col items-center w-[30%]'>
      <h1 className='my-2 font-sans text-black text-xl'>Trending products</h1>
      {productEl}
    </div>
  );
};

export default Trending;
