import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [query, setQuery] = useState();
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    if (query.trim()) {
      navigate(`/search/${encodeURIComponent(query)}`); // Navigate to search results page
    }
  };
  return (
    <div className='top-0 left-0 z-10 fixed bg-slate-100 px-4 py-2 w-full md:h-20'>
      <div className='flex justify-between items-center md:px-4 h-full'>
        <Link
          className='font-bold text-2xl text-black lg:text-3xl capitalize'
          to={"/"}
        >
          centro
        </Link>
        <div>
          <form onSubmit={handleSearch}>
            <input
              type='search'
              name='search'
              id='search'
              placeholder='search'
              className='hover:shadow p-2 border rounded-xl w-72'
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
          </form>
        </div>
        <div className='md:flex justify-center items-center md:gap-5 hidden'>
          <Link
            to='/signup'
            className='border-2 hover:shadow py-2 rounded-xl w-24 md:w-36 h-12 text-center text-sm md:text-xl transition-all'
          >
            Sign Up
          </Link>
          <Link
            to='/add-product'
            className='border-2 hover:shadow py-2 rounded-xl w-24 md:w-36 h-12 text-center text-xl transition-all'
          >
            Add product
          </Link>
          <Link
            to={"/"}
            className='premium-txt py-3 font-regular text-center text-sm md:text-xl'
          >
            Go Premium
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
