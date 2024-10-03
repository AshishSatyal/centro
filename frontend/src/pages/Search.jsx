// src/pages/SearchResults.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductItem from "../component/ProductItem";
import CenterComponent from "../component/CenterComponent";
import useAxios from "../util/axios";
import Trending from "../component/Trending";

const SearchResults = () => {
  const axiosInstance = useAxios();
  const { query } = useParams(); // Extract the query parameter from the URL
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `http://127.0.0.1:8000/centroApp/searchProduct/?q=${encodeURIComponent(
            query
          )}`
        );

        setResults(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [query]);
  console.log(results);

  return (
    <CenterComponent>
      <div className='flex justify-between gap-40 w-full'>
        <div className='w-fit search-results'>
          <h1 className='my-5'>Search Results for "{query}"</h1>
          {loading && <p>Loading...</p>}

          {results?.map((item) => (
            <ProductItem key={item.id} product={item} />
          ))}
        </div>
        <div className='border w-[40%]'>
          <Trending />
        </div>
      </div>
    </CenterComponent>
  );
};

export default SearchResults;
