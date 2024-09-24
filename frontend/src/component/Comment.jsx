import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GetComments from "./GetComments";

const Comment = () => {
  const { id } = useParams();

  const [seeComment, setSeeComment] = useState(false);
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/centroApp/products/${id}/comments/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization:
            //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI3MDgxMDMzLCJpYXQiOjE3MjcwNzgwMTUsImp0aSI6IjRmYmQxM2VjNGI3YjQzMjk5ODQ5MmQ3ZWEyMmNmNTNmIiwidXNlcl9pZCI6Mn0.qOuXLfRXTaFjEM04qbNtIwl47aNi1IMuAO_lyIQbR64",
          },
          body: JSON.stringify(comment),
        }
      );
    } catch (err) {
      console.log("error");
    }
  };

  return (
    <div className='flex flex-col items-start'>
      <h3 className='text-lg'>Add comment</h3>
      <form className='my-2' onSubmit={handleSubmit()}>
        <input
          className='border-2 rounded-xl w-96 h-10'
          name='comment'
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          type='text'
          placeholder=' Comment'
        />
      </form>
      <button
        onClick={(e) => setSeeComment(!seeComment)}
        className='my-2 underline'
      >
        See Other Comments
      </button>

      {seeComment ? <GetComments id={id} /> : null}
    </div>
  );
};

export default Comment;
