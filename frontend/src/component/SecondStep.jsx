import React from "react";

const SecondStep = ({ values, handleChange }) => {
  const categories = [
    { value: "", label: "Select a category" },
    { value: "phone", label: "Phone" },
    { value: "automobile", label: "Automobile" },
    { value: "instrument", label: "Instrument" },
    { value: "books", label: "Books" },
    { value: "fitness", label: "Fitness" },
  ];
  const conditions = [
    {
      value: "",
      label: "Select a condition",
    },
    {
      value: "good",
      label: "Good",
    },
    {
      value: "excellent",
      label: "excellent",
    },
    {
      value: "new",
      label: "New",
    },
    {
      value: "poor",
      label: "Poor",
    },
  ];
  const usedFor = [
    {
      value: "",
      label: "Select used for",
    },
    {
      value: "less than 1 month",
      label: "Less Than 1 Month",
    },
    {
      value: "more than one month",
      label: "More Than One Month",
    },
    {
      value: "more than 1 year",
      label: "More Than 1 Year",
    },
  ];
  return (
    <div className='flex flex-col justify-center items-start gap-2'>
      <div className='flex flex-col gap-1 w-full'>
        <label htmlFor='condition'>Condition of a product</label>
        <select
          name='condition'
          id='condition'
          value={values.condition}
          onChange={handleChange}
          className='px-2 border rounded-xl w-full h-10'
        >
          {conditions.map((con) => (
            <option key={con.value} value={con.value}>
              {con.label}
            </option>
          ))}
        </select>
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
        <select
          name='usedFor'
          id='usedFor'
          value={values.usedFor}
          onChange={handleChange}
          className='px-2 border rounded-xl w-full h-10'
        >
          {usedFor.map((used) => (
            <option key={used.value} value={used.value}>
              {used.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SecondStep;
