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
    <div>
      <ProductItem product={saved} key={saved.id} />
    </div>
  );
};

export default Saved;
