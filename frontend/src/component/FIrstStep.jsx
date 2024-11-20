import React from "react";
import { Input } from "antd";

const FIrstStep = ({ values, handleChange, handleImageUpload }) => {
  return (
    <div className='flex flex-col justify-center items-start gap-2'>
      <div className='flex flex-col gap-1 w-full'>
        <label htmlFor='title'>Title of a product</label>

        <Input
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
        <Input
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
      <div className='flex flex-col gap-1 w-full'>
        <label htmlFor='image'>Upload Image</label>
        <input
          type='file'
          required
          name='image'
          id='image'
          accept='image/*'
          onChange={handleImageUpload}
          className='border rounded-xl w-full h-10'
        />
      </div>
      {values.imagePreview && (
        <div className='flex justify-center items-center mt-4'>
          <img
            src={values.imagePreview}
            alt='Product Preview'
            className='rounded-lg w-32 h-32 object-cover'
          />
        </div>
      )}
    </div>
  );
};

export default FIrstStep;
