import React, { useState } from "react";
import { useParams } from "react-router-dom";
import GetComments from "./GetComments";

const Comment = () => {
  const { id } = useParams();

  const [seeComment, setSeeComment] = useState(false);
  console.log(seeComment);

  return (
    <div className='flex flex-col items-start'>
      <h3 className='text-lg'>Add comment</h3>
      <form className='my-2'>
        <input
          className='border-2 rounded-xl w-96 h-10'
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

      <GetComments id={id} />
    </div>
  );
};

export default Comment;
