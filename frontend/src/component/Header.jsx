import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import HeaderBelow from "./HeaderBelow";
import IconAvatars from "./ProfileAvatar";
import { LuLogOut } from "react-icons/lu";

const Header = () => {
  const { authTokens, logout } = useAuth();

  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    if (query?.trim()) {
      navigate(`/search/${encodeURIComponent(query)}`); // Navigate to search results page
    }
    setQuery("");
  };
  const handleLogout = () => {
    console.log("handles logout");
    logout();
  };
  return (
    <div className='top-0 left-0 z-10 fixed bg-black px-4 py-2 w-full md:h-20'>
      <div className='flex justify-between items-center md:px-4 h-full'>
        <Link
          className='font-bold text-2xl text-white lg:text-3xl capitalize'
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
              className='border-2 border-white hover:shadow p-2 rounded-xl w-96 placeholder:text-black capitalize'
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
          </form>
        </div>
        <div className='md:flex justify-center items-center md:gap-10 hidden'>
          <Link
            to='/add-product'
            className='border-2 border-white hover:border-gray-500 py-2 rounded-xl w-24 md:w-32 h-12 text-center text-lg text-white transition-all'
          >
            Add product
          </Link>
          {authTokens ? (
            <button
              onClick={handleLogout}
              className='text-white md:text-2xl transition-all hover:translate-x-2'
            >
              <LuLogOut />
            </button>
          ) : (
            <Link
              to='/signup'
              className='border-2 hover:border-white py-2 rounded-xl w-24 md:w-36 h-12 text-center text-sm text-white md:text-xl transition-all'
            >
              Sign Up
            </Link>
          )}
          <Link to={"/profile"}>
            <IconAvatars />
          </Link>
        </div>
      </div>
      <div className='mt-2'>
        <HeaderBelow />
      </div>
    </div>
  );
};

export default Header;
