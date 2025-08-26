import React, { useState } from "react";
import { useContext } from "react";
import { DontationContext } from "../../context/FoodDonationContext";

const RequestStep2 = () => {
  const { donorData } = useContext(DontationContext);

  const [formData, setFormData] = useState({
    donorName: donorData.donorName,
    phone: donorData.phone,
    email: donorData.email,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Donation Submitted:", formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mx-auto rounded-lg p-6 space-y-4"
    >
      <div>
        <span className="text-xl font-bold capitalize text-gray-800 flex text-left">
          Step 2: Contact Information
        </span>
        <p className=" text-left">
          Please provide your contact details so we can coordinate the food
          collection.
        </p>
      </div>

      {/* Donor Name */}
      <div className="flex flex-col ">
        <label
          htmlFor="donorName"
          className="text-gray-700 font-medium text-left"
        >
          Donor Name
        </label>
        <input
          type="text"
          name="donorName"
          id="donorName"
          readOnly
          value={formData.donorName}
          placeholder="Enter your name"
          className="mt-2 border border-gray-400 rounded-md p-2 focus:ring-2 focus:ring-green-500 outline-none"
          required
        />
      </div>

      {/* Phone Number */}
      <div className="flex flex-col">
        <label htmlFor="phone" className="text-gray-700 font-medium text-left">
          Phone Number
        </label>
        <input
          type="tel"
          name="phone"
          id="phone"
          readOnly
          value={formData.phone}
          placeholder="Enter your phone number"
          className="mt-2 border border-gray-400 rounded-md p-2 focus:ring-2 focus:ring-green-500 outline-none"
          required
        />
      </div>

      {/* Email Address */}
      <div className="flex flex-col">
        <label htmlFor="email" className="text-gray-700 font-medium text-left">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          readOnly
          value={formData.email}
          placeholder="Enter your email"
          className="mt-2 border border-gray-400 rounded-md p-2 focus:ring-2 focus:ring-green-500 outline-none"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-md transition duration-200"
      >
        Submit Donation
      </button>
    </form>
  );
};

export default RequestStep2;
