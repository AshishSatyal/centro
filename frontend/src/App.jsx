import { useState } from "react";

import "./App.css";
import Header from "./component/Header";
import NavSmall from "./component/NavSmall";

function App() {
  return (
    <>
      <div className='bottom-1 fixed md:hidden w-full'>
        <NavSmall />
      </div>
      <Header />
    </>
  );
}

export default App;
