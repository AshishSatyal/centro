import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import useAxios from "../util/axios";

const GetComments = ({ id }) => {
  const [comments, setComments] = useState([]);
  const axiosInstance = useAxios();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosInstance.get(
          `/centroApp/products/${id}/comments/`
        );

        setComments(response.data); // Update state with fetched comments
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [id]); // Add id as a dependency to refetch when it changes
  console.log(comments);
  const commentEl = comments?.map((comment) => (
    <div
      key={comment.id}
      className='border-gray-200 bg-white shadow-md mb-4 p-4 border rounded-lg w-[20rem]'
    >
      <p className='mb-2 text-gray-700 text-lg'>{comment.comment_text}</p>
      <p className='text-gray-500 text-sm'>By: {comment.user_full_name}</p>
    </div>
  ));

  return (
    <div className='bg-gray-100 my-2 p-6 max-w-xl'>
      <h2 className='mb-4 font-semibold text-gray-800 text-xl'>Comments</h2>
      {comments.length > 0 ? (
        <div className='space-y-4'>{commentEl}</div>
      ) : (
        <p className='text-gray-500'>No comments yet.</p>
      )}
    </div>
  );
};

export default GetComments;
