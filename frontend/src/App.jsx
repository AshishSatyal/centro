import { useState } from "react";

import "./App.css";
import Header from "./component/Header";
import NavSmall from "./component/NavSmall";
import Product from "./pages/Product";
import Sidebar from "./component/Sidebar";
import Trending from "./component/Trending";

function App() {
  return (
    <>
      <div className='bottom-1 fixed md:hidden w-full'>
        <NavSmall />
      </div>
      <Header />
      <div className='flex justify-start gap-2'>
        <Sidebar />
        <Product />
        <Trending />
      </div>
    </>
  );
}

export default App;
