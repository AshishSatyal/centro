import React, { useEffect, useState } from "react";
import MapComponent from "../map/MapComponent";

const ThirdStep = ({ values, handleChange }) => {
  const [toggle, setToggle] = useState(false);
  const [location, setLocation] = useState(null);

  const toggleMap = () => {
    setToggle((prevToggle) => !prevToggle);
  };

  useEffect(() => {
    const value = location?.[0]
      ? `${location?.[0]?.toString()},${location?.[1]?.toString()}`
      : undefined;
    const event = {
      target: {
        name: "location",
        value,
      },
    };
    handleChange(event);
  }, [location]);

  return (
    <div className='flex flex-col justify-center items-start gap-2'>
      <div className='flex flex-col gap-1 w-full'>
        <label htmlFor='Location'>Your Location</label>
        <input
          type='text'
          name='location'
          value={
            location?.[0]
              ? `${location?.[0]?.toString()},${location?.[1]?.toString()}`
              : undefined
          }
          onChange={handleChange}
          disabled
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
      <div className='w-full'>
        <button
          className='border-2 p-2 border-black rounded-xl text-black'
          onClick={() => toggleMap()}
        >
          Current Location
        </button>

        {toggle ? (
          <MapComponent setLocation={setLocation} location={location} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ThirdStep;
