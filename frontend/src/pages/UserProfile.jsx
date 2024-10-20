import React, { useEffect } from "react";
import { useUser } from "../context/UserContext";
import { toast, ToastContainer } from "react-toastify";
import useAxios from "../util/axios";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const { userDetail } = useUser();
  const [locationName, setLocationName] = React.useState("");

  const handleClick = async () => {
    try {
      const response = await axiosInstance.delete(
        `/centroApp/userAccountDelete/`
      );
      if (response.status === 200) {
        navigate("/login");
        toast.success("Account deleted successfully!");
      }
    } catch (err) {
      console.error("Error deleting account:", err);
      toast.error("Failed to delete account.");
    }
  };

  const fetchLocationName = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setLocationName(data.display_name || "Location not found");
    } catch (error) {
      console.error("Error fetching location name:", error);
    }
  };

  useEffect(() => {
    if (userDetail?.location) {
      const { latitude, longitude } = userDetail.location;
      fetchLocationName(latitude, longitude);
    }
  }, [userDetail]);

  return (
    <div className='flex justify-center items-center bg-gray-100 p-6 min-h-screen'>
      <div className='bg-white shadow-lg p-8 rounded-lg w-full max-w-5xl'>
        {/* Profile Header */}
        <div className='mb-8 pb-6 border-b'>
          <h2 className='font-semibold text-2xl text-gray-800'>Your Profile</h2>
        </div>

        {/* Main Content in Grid Layout */}
        <div className='gap-8 grid grid-cols-1 lg:grid-cols-2'>
          {/* Profile Section */}
          <div className='shadow-md p-6 border rounded-lg'>
            <h3 className='mb-4 font-semibold text-gray-800 text-xl'>
              Profile
            </h3>
            <div className='flex items-center'>
              {/* <img
                src='https://via.placeholder.com/60'
                alt='Profile'
                className='mr-4 border rounded-full w-16 h-16'
              /> */}
              <div>
                <h4 className='font-semibold text-gray-800 text-lg'>
                  {userDetail?.firstname} {userDetail?.lastname}
                </h4>
                {/* <p className='text-gray-600'>{userDetail.number}</p> */}
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className='shadow-md p-6 border rounded-lg'>
            <h3 className='mb-4 font-semibold text-gray-800 text-xl'>
              Address
            </h3>
            <div className='text-gray-600'>
              <p className='font-semibold'>Primary</p>
              <p>{locationName}</p>
            </div>
          </div>

          {/* Emails Section */}
          <div className='shadow-md p-6 border rounded-lg'>
            <h3 className='mb-4 font-semibold text-gray-800 text-xl'>Emails</h3>
            <div className='text-gray-600'>
              <p className='font-semibold'>Primary</p>
              <p>{userDetail.email}</p>
            </div>
          </div>

          {/* Phone Section */}
          <div className='shadow-md p-6 border rounded-lg'>
            <h3 className='mb-4 font-semibold text-gray-800 text-xl'>
              Phone Numbers
            </h3>
            <div className='text-gray-600'>
              <p className='font-semibold'>Primary</p>
              <p>{userDetail.number}</p>
            </div>
          </div>

          {/* Account Options Section */}
          <div className='lg:col-span-2 shadow-md p-6 border rounded-lg'>
            <h3 className='mb-4 font-semibold text-gray-800 text-xl'>
              Account Options
            </h3>
            <div className='text-gray-600'>
              <p>
                <span className='font-semibold'>Language:</span> English
              </p>
              <p>
                <span className='font-semibold'>Nationality:</span> Nepalese
              </p>
              <button
                onClick={handleClick}
                className='bg-red-500 hover:bg-red-600 mt-4 px-4 py-2 rounded-md text-white'
              >
                Close your account
              </button>
            </div>
          </div>
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
    </div>
  );
};

export default ProfilePage;
