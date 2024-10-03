import React, { createContext, useContext, useState, useEffect } from "react";
import useAxios from "../util/axios";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const axiosInstance = useAxios();
  const [userDetail, setUserDetails] = useState({});

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await axiosInstance.get("/centroApp/user/");
        setUserDetails((prevData) => {
          return {
            ...prevData,
            ...response.data,
          };
        });
      } catch (err) {
        console.log(err);
      }
    };

    getUserDetails();
  }, []); // Include axiosInstance in dependency array

  //   console.log(userDetail);

  return (
    <UserContext.Provider value={{ userDetail, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};
