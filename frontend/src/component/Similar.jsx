import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { useAuth } from "../context/AuthContext";
import useAxios from "../util/axios";
const Similar = () => {
  const axiosInstance = useAxios();
  const [similarProduct, setSimilarProduct] = useState([]);

  useEffect(() => {
    const getSimilarProduct = async () => {
      try {
        const response = await axiosInstance.get("/centroApp/similarity/");

        setSimilarProduct(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getSimilarProduct();
  }, []);

  const similarEl = similarProduct?.map((item) => {
    <ProductItem key={item.id} product={item} />;
  });

  return <div>{similarEl}</div>;
};

export default Similar;
