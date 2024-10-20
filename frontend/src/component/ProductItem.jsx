// src/components/ProductItem.js
import React from "react";
import { Link } from "react-router-dom";
import Comment from "./Comment";

const ProductItem = ({ product }) => {
  // console.log(product.id);
  const _id = product.id ?? product.product_id;

  return (
    <Link to={`/product/${_id}`}>
      <div className='relative hover:shadow border border-black rounded-lg w-[35rem] h-52 transition-all'>
        <div className='flex w-full h-full'>
          <div className='p-2 w-[30%] h-full'>
            <img
              className='rounded-xl w-full h-full'
              src={`http://127.0.0.1:8000${product.image}`}
              alt='product'
            />
          </div>

          <div className='flex flex-col w-[70%]'>
            <p className='mt-2 text-xl'>{product.name}</p>
            <p className={`mt-2 text-gray-600 text-sm`}>
              {product.description}
            </p>
            <p className='pt-2 pr-2 text-gray-500 text-xs'>
              {product.category}
            </p>
            <div className='flex justify-between mt-auto'>
              <p className='pb-1 text-slate-500'>Rs.{product.price}</p>
              <p className='pr-2 pb-1 text-slate-500 text-xs'>
                {(product?.uploaded_at || product?.saved_at)?.split("T")[0]}
              </p>
              {/* <p className='pr-2 pb-1 text-slate-500 text-xs'>
                {product?.saved_at.split("T")[0]}
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
