import React from "react";
import { NavLink } from "react-router-dom";

const Links = ({ name, href }) => {
  return (
    <NavLink
      to={href}
      className={({ isActive }) => {
        return `text-xl py-1 w-full border h-10 rounded-xl px-4 capitalize ${
          isActive ? "active-nav" : {}
        }`;
      }}
    >
      {name}
    </NavLink>
  );
};

export default Links;
