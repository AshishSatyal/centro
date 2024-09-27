// src/components/ProductItem.js
import React from "react";
import { Link } from "react-router-dom";
import Comment from "./Comment";

const ProductItem = ({ product }) => {
  return (
    <Link to={`product/${product.id}`}>
      <div className='relative hover:shadow border rounded-lg w-[30rem] h-40 transition-all'>
        <div className='flex w-full h-full'>
          <div className='p-2 w-[30%] h-full'>
            <img
              className='rounded-xl w-full h-full'
              src={`http://127.0.0.1:8000${product.image}`}
              alt='product'
            />
          </div>

          <div className='flex flex-col w-[70%]'>
            <p className='text-xl'>{product.name}</p>
            <p className='text-gray-600 text-sm'>{product.description}</p>
            <p className='pt-2 pr-2 text-gray-500 text-xs'>
              Lorem ipsum dolor sit amet consecur adipisicing elit. Doloremque
              odio.
            </p>
            <div className='flex justify-between mt-auto'>
              <p className='pb-1 text-slate-500'>Rs.{product.price}</p>
              <p className='pr-2 pb-1 text-slate-500 text-xs'>2 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
