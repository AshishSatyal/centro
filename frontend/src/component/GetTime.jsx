import React from "react";
import { timeAgo } from "../util/Time";

const GetTime = ({ uploadedAt }) => {
  return (
    <div>
      <p>Uploaded: {timeAgo(uploadedAt)}</p>
    </div>
  );
};

export default GetTime;
