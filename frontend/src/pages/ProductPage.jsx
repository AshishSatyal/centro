import React, { useEffect, useState } from "react";
import CenterComponent from "../component/CenterComponent";
import { useAuth } from "../context/AuthContext";
import useAxios from "../util/axios";
import { useParams, Link } from "react-router-dom";
import ProductItem from "../component/ProductItem";
import Comment from "../component/Comment";
import Similar from "../component/Similar";
import SaveProduct from "../component/SaveProduct";

const ProductPage = () => {
  const axiosInstance = useAxios();
  const [product, setProduct] = useState([]);
  const [similarProducut, setSimilarProduct] = useState([]);

  const { id } = useParams();

  const { authTokens } = useAuth();
  useEffect(() => {
    const fetched = async () => {
      const response = await axiosInstance.get(
        `/centroApp/selectedProduct/${id}`
      );
      // const data = await response.json();
      setProduct(response.data);
    };
    fetched();
  }, [id]);

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
          <div className='flex justify-between'>
            <p className='border-b text-3xl capitalize'>{product.name}</p>
            <SaveProduct id={product.id} />
          </div>
          <p className='my-4 text-xl'>{product.description}</p>
          <p className='my-4 border-b'>
            <span className='font-semibold'>Category:</span> {product.category}
          </p>
          <p className='my-2 font-semibold text-slate-500 text-xl'>
            Rs.{product.price}
          </p>
          <div className='flex justify-between py-2'>
            <p className='text-base capitalize'>Posted by user_abc</p>
            <p className='text-slate-500 capitalize'>5mins ago</p>
          </div>
          <div className='flex justify-center items-center mt-2'>
            <Link
              to={`/map-location/${id}`}
              className='bg-black p-2 border rounded-xl w-full h-12 text-center text-white text-xl'
            >
              See on Map
            </Link>
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
      </div>
      <Similar />
    </div>
  );
};

export default ProductPage;
