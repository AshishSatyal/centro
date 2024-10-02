// src/Modal.js
import React from "react";

const Modal = ({ isOpen, onClose, location }) => {
  if (!isOpen) return null;

  return (
    <div className='z-50 fixed inset-0 flex justify-center items-center'>
      <div
        className='absolute inset-0 bg-black opacity-50'
        onClick={onClose}
      ></div>
      <div className='z-10 bg-white shadow-lg p-6 rounded-lg w-full max-w-sm'>
        <h2 className='mb-4 font-semibold text-xl'>User Location</h2>
        <p className='mb-4'>{`This is your current location ${location}`}</p>
        <button
          onClick={onClose}
          className='bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white'
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
