import React from "react";

const SecondStep = ({ values, handleChange }) => {
  return (
    <div className='flex flex-col justify-center items-start gap-2'>
      <div className='flex flex-col gap-1 w-full'>
        <label htmlFor='title'>Condition of a product</label>
        <input
          type='text'
          name='condition'
          value={values.condition}
          onChange={handleChange}
          id='condition'
          className='px-2 border rounded-xl w-full h-10'
          placeholder='Condition'
        />
      </div>
      <div className='flex flex-col gap-1 w-full'>
        <label htmlFor='price'>Category of a product</label>
        <input
          className='px-2 border rounded-xl w-full h-10'
          type='text'
          name='category'
          id='category'
          placeholder='category'
          value={values.category}
          onChange={handleChange}
        />
      </div>
      <div className='flex flex-col gap-1 w-full'>
        <label htmlFor='usedFor'>Used For</label>
        <input
          className='px-2 border rounded-xl w-full h-10'
          type='text'
          name='usedFor'
          id='usedFor'
          value={values.usedFor}
          onChange={handleChange}
          placeholder='Used For'
        />
      </div>
    </div>
  );
};

export default SecondStep;
