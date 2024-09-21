import React from "react";

const FIrstStep = ({ values, handleChange }) => {
  return (
    <div className='flex flex-col justify-center items-start gap-2'>
      <div className='flex flex-col gap-1 w-full'>
        <label htmlFor='title'>Title of a product</label>
        <input
          type='text'
          name='name'
          value={values.name}
          id='name'
          onChange={handleChange}
          className='px-2 border rounded-xl w-full h-10'
          placeholder='Title'
        />
      </div>
      <div className='flex flex-col gap-1 w-full'>
        <label htmlFor='price'>Price of a product</label>
        <input
          className='px-2 border rounded-xl w-full h-10'
          type='number'
          name='price'
          id='price'
          value={values.price}
          placeholder='Price'
          onChange={handleChange}
        />
      </div>
      <div className='flex flex-col gap-1 w-full'>
        <label htmlFor='description'>Description</label>
        <textarea
          name='description'
          placeholder='description'
          id='description'
          value={values.description}
          onChange={handleChange}
          className='border rounded-xl w-full h-16'
        ></textarea>
      </div>
    </div>
  );
};

export default FIrstStep;
