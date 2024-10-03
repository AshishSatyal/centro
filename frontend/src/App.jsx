import { useState, useEffect } from "react";
import "./App.css";
import Header from "./component/Header";
import NavSmall from "./component/NavSmall";
import Product from "./pages/Product";
import Sidebar from "./component/Sidebar";
import Trending from "./component/Trending";
import { useUser } from "./context/UserContext";

function App() {
  return (
    <>
      {/* <div className='bottom-1 fixed md:hidden w-full'>
        <NavSmall />
      </div> */}

      <div className='flex justify-around w-full'>
        <Product />
        <Trending />
      </div>
    </>
  );
}

export default App;
