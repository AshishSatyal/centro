import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { useParams } from "react-router-dom";
import useAxios from "../util/axios";

const Similar = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    const getSimilarProducts = async () => {
      try {
        const response = await axiosInstance.get(`/centroApp/similarity/${id}`);
        // Correcting the data access
        setSimilarProducts(response.data.similar_products);
      } catch (err) {
        console.log(err);
      }
    };
    getSimilarProducts();
  }, [id]);

  const similarElements = similarProducts?.map((item) => {
    // console.log(item);
    return (
      <ProductItem key={item?.product_id} product={item} width={"w-[25rem]"} />
    ); // Adding key prop
  });

  return <div className='flex flex-wrap gap-2'>{similarElements}</div>;
};

export default Similar;
