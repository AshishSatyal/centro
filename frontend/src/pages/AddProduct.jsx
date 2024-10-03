import React, { useState } from "react";
import CenterComponent from "../component/CenterComponent";
import { Step, Stepper } from "react-form-stepper";
import FIrstStep from "../component/FIrstStep";
import SecondStep from "../component/SecondStep";
import ThirdStep from "../component/ThirdStep";
import { json } from "react-router-dom";
import { useUser } from "../context/UserContext";

const AddProduct = () => {
  const { userDetail } = useUser();
  console.log(userDetail);
  const [activeStep, setActiveStep] = useState(1);

  const [formdata, setFormData] = useState({
    userName: userDetail.id,
    name: undefined,
    image: undefined,
    price: undefined,
    description: undefined,
    condition: undefined,
    category: undefined,
    usedFor: undefined,
    location: undefined,
    locationDescription: undefined,
    // sold: false,
    countInStock: 3,
  });

  const handleSubmit = async () => {
    console.log("clicking");

    const formData = new FormData();
    Object.keys(formdata).forEach((key) => {
      formData.append(key, formdata[key]);
    });

    try {
      await fetch("http://127.0.0.1:8000/centroApp/Product/", {
        method: "POST",
        body: formData,
      });
    } catch (err) {
      console.log(err);
    }
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((preValues) => {
      return {
        ...preValues,
        [name]: value,
      };
    });
  }
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleChange({
        target: {
          name: "image",
          value: file, // Append file directly to the formdata
        },
      });
    }
  };

  console.log(formdata);

  return (
    <CenterComponent>
      <div className='flex flex-col items-center my-5 mr-40'>
        <h1 className='my-5 font-serif text-3xl capitalize'>Add a product</h1>

        <div className='px-2 w-5/12'>
          <form
            className='px-4 border w-full'
            onSubmit={(e) => e.preventDefault()}
          >
            <Stepper
              steps={[
                { label: "Product Details", active: activeStep === 1 },
                { label: "Product Specification", active: activeStep === 2 },
                { label: "Location", active: activeStep === 3 },
              ]}
              activeStep={1}
            />
            {activeStep === 1 && (
              <FIrstStep
                values={formdata}
                handleChange={handleChange}
                handleImageUpload={handleImageUpload}
              />
            )}
            {activeStep === 2 && (
              <SecondStep values={formdata} handleChange={handleChange} />
            )}
            {activeStep === 3 && (
              <ThirdStep values={formdata} handleChange={handleChange} />
            )}
            <div className='flex justify-between my-5 w-full'>
              <button
                className='bg-black rounded-xl w-24 h-10 text-white'
                onClick={(e) => {
                  e.preventDefault();
                  setActiveStep(activeStep == 1 ? activeStep : activeStep - 1);
                }}
                type='button'
              >
                Back
              </button>
              {activeStep == 3 ? (
                <button
                  className='bg-slate-200 rounded-xl w-24 h-10'
                  onClick={(e) => handleSubmit()}
                  type='submit'
                >
                  Submit
                </button>
              ) : (
                <button
                  className='bg-slate-200 rounded-xl w-24 h-10'
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveStep(activeStep + 1);
                  }}
                  type='button'
                >
                  Next
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </CenterComponent>
  );
};

export default AddProduct;
