// src/pages/CheckEmail.jsx
import React from 'react';
import { FiMail } from 'react-icons/fi';

const CheckEmail = ({ email }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-[#c3d7e8] text-[#3E5973] p-4">
    <FiMail className="text-6xl mb-4" />
    <h1 className="text-2xl font-semibold mb-2">Check Your Inbox</h1>
    <p className="text-center max-w-md">
      We’ve sent a password reset link to <strong>{email}</strong>.  
      Please click the link in that email to choose a new password.
    </p>
  </div>
);

export default CheckEmail;
