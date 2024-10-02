// src/pages/Product.js
import React, { useEffect, useState } from "react";
import ProductItem from "../component/ProductItem";

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://127.0.0.1:8000/centroApp/Product/");
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);
  console.log(products);
  return (
    <div className='flex flex-col gap-5 border-x-2 p-10'>
      {products.map((product) => (
        <div>
          <ProductItem key={product.id} product={product} />
          <ProductItem key={product.id} product={product} />
        </div>
      ))}
    </div>
  );
};

export default Product;
