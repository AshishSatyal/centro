import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { useAuth } from "../context/AuthContext";
import useAxios from "../util/axios";
import { useParams } from "react-router-dom";

const Similar = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();
  const [similarProduct, setSimilarProduct] = useState([]);

  useEffect(() => {
    const getSimilarProduct = async () => {
      try {
        const response = await axiosInstance.get(`/centroApp/similarity/${id}`);
        setSimilarProduct(response.data.similar_products);
      } catch (err) {
        console.log(err);
      }
    };
    getSimilarProduct();
  }, [id]);

  const similarEl = similarProduct?.map((item) => {
    console.log(item);
    return <ProductItem key={item.id} product={item} />;
  });

  return <div>{similarEl}</div>;
};

export default Similar;
