import React, { useEffect, useState } from "react";
import useAxios from "../util/axios";
import ProductItem from "../component/ProductItem";

const Saved = () => {
  const [saved, setSaved] = useState([]);
  const axiosInstance = useAxios();
  useEffect(() => {
    const fetchSavedProduct = async () => {
      const response = await axiosInstance.get(`/centroApp/saved-items/`);

      setSaved(response.data);
    };
    fetchSavedProduct();
  }, []);

  return (
    <div className='flex flex-col gap-5 border-x-2 p-10'>
      <h1 className='text-2xl capitalize'>saved products</h1>
      {saved?.map((item) => {
        return (
          <div className='w-fit'>
            <ProductItem product={item} key={item.id} />;
          </div>
        );
      })}
    </div>
  );
};

export default Saved;
