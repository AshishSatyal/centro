import React, { useEffect, useState } from "react";

const GetComments = ({ id }) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await fetch(
        `http://localhost:8000/centroApp/products/${id}/comments/`
      );
      setComments(data);
    };
    fetchComments();
  }, []);
  return <div>GetComments</div>;
};
export default GetComments;
