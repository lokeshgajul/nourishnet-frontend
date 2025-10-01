import React, { useState } from "react";
import { useContext } from "react";
import { DontationContext } from "../../context/FoodDonationContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const RequestStep2 = () => {
  const { donorData, foodDonationForm } = useContext(DontationContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("donorId", donorData._id);
    formData.append("foodTitle", foodDonationForm.foodTitle);
    formData.append("foodImage", foodDonationForm.imageFile);
    formData.append("foodCategory", foodDonationForm.foodCategory);
    formData.append("foodQuantity", foodDonationForm.foodQuantity);
    formData.append("foodDescription", foodDonationForm.foodDescription);
    formData.append("donorName", donorData.donorName);
    formData.append("donorPhone", donorData.phone);
    formData.append("donorAddress", donorData.address);
    formData.append("donationStatus", "Pending");

    try {
      const response = await axios.post(
        "http://localhost:3000/donor/donations",
        formData,
        {
          headers: "multipart/form-data",
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log("Error ", error.message);
    } finally {
      setIsSubmitting(false);
      navigate("/");
    }
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
          value={donorData.donorName}
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
          value={donorData.phone}
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
          value={donorData.email}
          placeholder="Enter your email"
          className="mt-2 border border-gray-400 rounded-md p-2 focus:ring-2 focus:ring-green-500 outline-none"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-md transition duration-200"
      >
        {isSubmitting ? "Submitting..." : "Submit Donation"}
      </button>
    </form>
  );
};

export default RequestStep2;
