import React, { useEffect, useState } from "react";

import { useUser } from "../context/UserContext";

const ProfilePage = () => {
  const { userDetail } = useUser();
  console.log("user detail", userDetail);

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
              <img
                src='https://via.placeholder.com/60'
                alt='Profile'
                className='mr-4 border rounded-full w-16 h-16'
              />
              <div>
                <h4 className='font-semibold text-gray-800 text-lg'>
                  Maksudur Rahman
                </h4>
                <p className='text-gray-600'>+880 1924699597</p>
                <button className='bg-blue-500 hover:bg-blue-600 mt-2 px-4 py-2 rounded-md text-white'>
                  Edit
                </button>
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
              <p>119 North Jatrabair, Dhaka 1294, Bangladesh</p>
              <p>420 Fariada Palace, Pallibiddut Road, Patuakhali</p>
            </div>
          </div>

          {/* Emails Section */}
          <div className='shadow-md p-6 border rounded-lg'>
            <h3 className='mb-4 font-semibold text-gray-800 text-xl'>Emails</h3>
            <div className='text-gray-600'>
              <p className='font-semibold'>Primary</p>
              <p>maksud.design7@gmail.com</p>
              <p>tamannamr7@gmail.com</p>
              <div className='mt-4'>
                <button className='bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md text-white'>
                  See all emails (4)
                </button>
                <button className='bg-gray-300 hover:bg-gray-400 ml-2 px-4 py-2 rounded-md text-gray-700'>
                  Add Email
                </button>
              </div>
            </div>
          </div>

          {/* Phone Section */}
          <div className='shadow-md p-6 border rounded-lg'>
            <h3 className='mb-4 font-semibold text-gray-800 text-xl'>
              Phone Numbers
            </h3>
            <div className='text-gray-600'>
              <p className='font-semibold'>Primary</p>
              <p>+880 1924699597</p>
              <p>+880 1737841820</p>
            </div>
          </div>

          {/* Account Options Section */}
          <div className='lg:col-span-2 shadow-md p-6 border rounded-lg'>
            <h3 className='mb-4 font-semibold text-gray-800 text-xl'>
              Account Options
            </h3>
            <div className='text-gray-600'>
              <p>
                <span className='font-semibold'>Language:</span> Bangla
              </p>
              <p>
                <span className='font-semibold'>Time zone:</span> (GMT+6) Time
                in Bangladesh
              </p>
              <p>
                <span className='font-semibold'>Nationality:</span> Bangladeshi
              </p>
              <p>
                <span className='font-semibold'>Merchant ID:</span>{" "}
                XYZ20150403095
              </p>
              <button className='bg-red-500 hover:bg-red-600 mt-4 px-4 py-2 rounded-md text-white'>
                Close your account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
