// src/pages/SearchResults.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductItem from "../component/ProductItem";

const SearchResults = () => {
  const { query } = useParams(); // Extract the query parameter from the URL
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      setLoading(true);
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/centroApp/searchProduct/?name=${encodeURIComponent(
            query
          )}`
        );
        const data = await response.json();

        setResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [query]);

  return (
    <div className='search-results'>
      <h1>Search Results for "{query}"</h1>
      {loading && <p>Loading...</p>}

      {results?.map((item) => (
        <ProductItem key={item.id} product={item} />
      ))}
    </div>
  );
};

export default SearchResults;
