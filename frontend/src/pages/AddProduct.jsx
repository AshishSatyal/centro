import React, { useState } from "react";
import CenterComponent from "../component/CenterComponent";
import { Step, Stepper } from "react-form-stepper";
import FIrstStep from "../component/FIrstStep";
import SecondStep from "../component/SecondStep";
import ThirdStep from "../component/ThirdStep";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProduct = () => {
  const navigate = useNavigate();
  const { userDetail } = useUser();
  const userId = userDetail?.id ? Number(userDetail.id) : 1;

  const [activeStep, setActiveStep] = useState(1);
  const [formdata, setFormData] = useState({
    userName: userId,
    name: undefined,
    image: undefined,
    price: undefined,
    description: undefined,
    condition: undefined,
    category: undefined,
    usedFor: undefined,
    location: undefined,
    locationDescription: undefined,
    countInStock: 3,
  });

  const validateStep = () => {
    switch (activeStep) {
      case 1:
        if (!formdata.name || !formdata.price || !formdata.description) {
          toast.error("Please fill in all required fields in Step 1.");
          return false;
        }
        break;
      case 2:
        if (!formdata.condition || !formdata.category || !formdata.usedFor) {
          toast.error("Please fill in all required fields in Step 2.");
          return false;
        }
        break;
      case 3:
        if (!formdata.location || !formdata.locationDescription) {
          toast.error("Please fill in all required fields in Step 3.");
          return false;
        }
        break;
      default:
        return true;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => (prev === 1 ? prev : prev - 1));
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    const formData = new FormData();
    Object.keys(formdata).forEach((key) => {
      formData.append(key, formdata[key]);
    });

    try {
      const response = await fetch("http://127.0.0.1:8000/centroApp/Product/", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        toast.success("Product added successfully!");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (err) {
      toast.error("An error occurred while submitting the form.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevValues) => ({
        ...prevValues,
        image: file,
      }));
    }
  };

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
              activeStep={activeStep}
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
                onClick={handleBack}
                type='button'
              >
                Back
              </button>
              {activeStep === 3 ? (
                <button
                  className='bg-slate-200 rounded-xl w-24 h-10'
                  onClick={handleSubmit}
                  type='submit'
                >
                  Submit
                </button>
              ) : (
                <button
                  className='bg-slate-200 rounded-xl w-24 h-10'
                  onClick={handleNext}
                  type='button'
                >
                  Next
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </CenterComponent>
  );
};

export default AddProduct;
