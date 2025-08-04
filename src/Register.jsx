// src/Register.jsx
import { useState } from 'react';
import { Link } from "react-router-dom";

function Register() {
  const [userType, setUserType] = useState('donor');
  const isDonor = userType === 'donor';

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/final.jpg')" }}
    >
      <div className="bg-white/90 shadow-2xl p-8 rounded-3xl w-[23rem] border border-green-200 transition-all duration-300 hover:shadow-green-200">

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-green-700 mb-2 font-[Poppins]">Create Account</h2>
          <p className="text-green-500 text-sm">Register as a Donor or NGO</p>
        </div>

        {/* Form */}
        <form className="space-y-4">
          {/* Role Dropdown */}
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">
              Select Role
            </label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="w-full px-6 py-3 border border-green-300 rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
            >
              <option value="donor">Food Donor</option>
              <option value="ngo">NGO</option>
            </select>
          </div>

          {/* Conditional Fields */}
          {isDonor ? (
            <>
              <Input label="Full Name" placeholder="Your Full Name" />
              <Input type="email" label="Email" placeholder="you@example.com" icon="@" />
              <Input type="text" label="Phone Number" placeholder="e.g. 9876543210" />
              <Input type="text" label="Address" placeholder="Complete Address" />
              <Input type="password" label="Password" placeholder="Create a password" icon="🔐" />
            </>
          ) : (
            <>
              <Input label="NGO Name" placeholder="Organization Name" />
              <Input type="email" label="Email" placeholder="ngo@example.org" icon="@" />
              <Input type="text" label="Phone Number" placeholder="e.g. 9876543210" />
              <Input type="text" label="Address" placeholder="Head Office Address" />
              <div>
                <label className="block mb-1 text-sm font-semibold text-gray-700">Bio</label>
                <textarea
                  rows="3"
                  placeholder="Tell us about your organization"
                  className="w-full px-6 py-3 border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none transition-all"
                />
              </div>
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-green-600 hover:text-green-700 font-semibold transition-colors"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// Reusable Input Component
function Input({ label, type = "text", placeholder, icon }) {
  return (
    <div className="relative">
      <label className="block mb-1 text-sm font-semibold text-gray-700">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-6 py-3 pr-10 border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
      />
      {icon && (
        <span className="absolute right-4 top-9 transform -translate-y-1/2 text-green-500 text-lg">
          {icon}
        </span>
      )}
    </div>
  );
}

export default Register;
