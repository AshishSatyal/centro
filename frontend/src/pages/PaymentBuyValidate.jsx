import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
// import { locationNameAtom } from "./@state/state";
// import { useAtom } from "jotai";
const PaymentButValidate = () => {
  // const [locationName] = useAtom(locationNameAtom);
  const locationName = location.state.locationName;
  console.log(locationName);
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const pidx = query.get("pidx");
  const status = query.get("status");

  return (
    <>
      <p>successful</p>
      <p>location name:{locationName}</p>
    </>
  );
};

export default PaymentButValidate;
