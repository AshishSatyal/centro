import React from "react";

const SecondStep = ({ values, handleChange }) => {
  // Sample categories - you can replace these with your actual categories
  const categories = [
    { value: "", label: "Select a category" },
    { value: "phone", label: "Phone" },
    { value: "automobile", label: "Automobile" },
    { value: "instrument", label: "Instrument" },
    { value: "books", label: "Books" },
    { value: "fitness", label: "Fitness" },
    // Add more categories as needed
  ];

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
        <label htmlFor='category'>Category of a product</label>
        <select
          name='category'
          id='category'
          value={values.category}
          onChange={handleChange}
          className='px-2 border rounded-xl w-full h-10'
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
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
