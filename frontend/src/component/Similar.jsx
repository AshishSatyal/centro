import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";

const Similar = () => {
  const [similarProduct, setSimilarProduct] = useState([]);

  useEffect(() => {
    const getSimilarProduct = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/centroApp/similarity/"
        );

        const data = response.json();

        setSimilarProduct(data);
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
