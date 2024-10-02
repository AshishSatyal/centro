import React, { useState } from "react";
import { useParams } from "react-router-dom";
import GetComments from "./GetComments";
import useAxios from "../util/axios";

const Comment = () => {
  const axiosInstance = useAxios();
  const { id } = useParams();

  const [seeComment, setSeeComment] = useState(false);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page
    try {
      const response = await axiosInstance.post(
        `/centroApp/products/${id}/comments/`,
        {
          comment_text: comment,
          product: id,
        }
      );
      setComment(""); // Clear the comment input after submission
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <div className='flex flex-col items-start'>
      <h3 className='text-lg'>Add comment</h3>
      <form className='my-2' onSubmit={handleSubmit}>
        <input
          className='border-2 rounded-xl w-96 h-10'
          name='comment'
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          type='text'
          placeholder=' Comment'
        />
        <button
          type='submit'
          className='m-2 border border-black rounded-xl w-32 h-10'
        >
          Submit
        </button>
      </form>
      <button
        onClick={(e) => setSeeComment(!seeComment)}
        className='my-2 underline'
      >
        See Other Comments
      </button>

      {seeComment && <GetComments id={id} />}
    </div>
  );
};

export default Comment;
