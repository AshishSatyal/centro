import React, { useEffect, useState } from "react";
import CenterComponent from "../component/CenterComponent";

import { useParams } from "react-router-dom";
import ProductItem from "../component/ProductItem";
import Comment from "../component/Comment";
import Similar from "../component/Similar";

const ProductPage = () => {
  const [product, setProduct] = useState([]);
  const [similarProducut, setSimilarProduct] = useState([]);

  const { id } = useParams();

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
    <div className='w-fit'>
      <div className='flex items-center gap-5 w-full h-full'>
        <div className='p-2 border-red-600 w-[20%] h-full'>
          <img
            className='w-full h-full'
            src={`http://127.0.0.1:8000${product.image}`}
            alt='product'
          />
        </div>
        <div className='p-2 w-[50%]'>
          <p className='border-b text-3xl capitalize'>{product.name}</p>
          <p className='my-4 text-xl'>{product.description}</p>
          <p className='my-4 border-b'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque,
            quibusdam praesentium cupiditate sapiente voluptatem neque,
            perspiciatis amet fugiat saepe ex, vitae provident mollitia debitis.
            Neque omnis accusantium id harum non?
          </p>
          <p className='my-2 font-semibold text-slate-500 text-xl'>
            Rs.{product.price}
          </p>
          <div className='flex justify-between py-2'>
            <p className='text-base capitalize'>Posted by user_abc</p>
            <p className='text-slate-500 capitalize'>5mins ago</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className='flex-col mt-2'>
      <div>{productEl}</div>
      <Comment />
      <div className='w-fit'>
        <p className='border-b text-lg capitalize'>Similar Products</p>
        {/* <ProductItem key={product.id} product={product} /> */}
      </div>
      <Similar />
    </div>
  );
};

export default ProductPage;
