import React from "react";

const ThirdStep = ({ values, handleChange }) => {
  return (
    <div className='flex flex-col justify-center items-start gap-2'>
      <div className='flex flex-col gap-1 w-full'>
        <label htmlFor='Location'>Your Location</label>
        <input
          type='text'
          name='location'
          value={values.location}
          onChange={handleChange}
          id='location'
          className='px-2 border rounded-xl w-full h-10'
          placeholder='Location'
        />
      </div>

      <div className='flex flex-col gap-1 w-full'>
        <label htmlFor='locationDescription'>Location Description</label>
        <textarea
          name='locationDescription'
          placeholder='Location description'
          value={values.locationDescription}
          onChange={handleChange}
          id='locationDescription'
          className='border rounded-xl w-full h-16'
        ></textarea>
      </div>
    </div>
  );
};

export default ThirdStep;
