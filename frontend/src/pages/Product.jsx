import React, { useEffect, useState } from "react";

const Product = () => {
  const [products, setProducts] = useState([]);
  console.log(products);
  //   const onSubmit = async (data) => {
  //     try {
  //       await fetch("http://127.0.0.1:8000/centroApp/Product/", {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(data),
  //       });
  //     } catch (err) {
  //       setError("email", {
  //         message: "Email already exists",
  //       });
  //     }
  //   };
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://127.0.0.1:8000/centroApp/Product/");
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Product</h1>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <h1>{product.name}</h1>
            <h1>{product.price}</h1>
            <img
              src={`http://127.0.0.1:8000${product.image}`}
              alt={product.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
