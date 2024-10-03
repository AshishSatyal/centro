import React, { useEffect, useState } from "react";
import useAxios from "../util/axios";
import { useParams } from "react-router-dom";
import ProductItem from "../component/ProductItem";
import Trending from "../component/Trending";
import CenterComponent from "../component/CenterComponent";

const Category = () => {
  const { category } = useParams();
  console.log(category);
  const [result, setResult] = useState([]);
  //   const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false); // State for loading status
  const axiosInstance = useAxios();

  useEffect(() => {
    const fetchResults = async () => {
      if (!category) return; // Don't fetch if query is empty

      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `http://127.0.0.1:8000/centroApp/searchProduct/?q=${encodeURIComponent(
            category
          )}`
        );
        setResult(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [category]); // Added axiosInstance to dependencies

  return (
    <CenterComponent>
      <h1 className='mt-5 text-xl capitalize'>{category}</h1>
      <div className='flex justify-between gap-40 w-full'>
        <div className='w-fit search-results'>
          {loading && <p>Loading...</p>}

          {result?.map((item) => (
            <div className='mt-4'>
              <ProductItem key={item.id} product={item} />
            </div>
          ))}
        </div>
        <div className='w-[40%]'>
          <Trending />
        </div>
      </div>
    </CenterComponent>
  );
};

export default Category;
