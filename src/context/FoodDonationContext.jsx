import axios from "axios";
import React, { createContext, useState } from "react";

export const DontationContext = createContext();

export const FoodDonationProvider = ({ children }) => {
  const [foodDonationForm, setFoodDonationForm] = useState({
    foodTitle: "",
    imageFile: null,
    foodCategory: "",
    foodQuantity: 1,
    foodDescription: "",
    preview: null,
  });
  const [donorContactForm, setDonorContactForm] = useState();

  const handleFoodDonation = (field, value) => {
    setFoodDonationForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleIncrement = () => {
    setFoodDonationForm((prev) => ({
      ...prev,
      foodQuantity: prev.foodQuantity + 1,
    }));
  };
  const handleDecrement = () => {
    setFoodDonationForm((prev) => ({
      ...prev,
      foodQuantity: prev.foodQuantity > 1 ? prev.foodQuantity - 1 : 1,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoodDonationForm((prev) => ({
        ...prev,
        imageFile: file,
        preview: URL.createObjectURL(file),
      }));
    }
  };

  const getDonorDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/getDonorDetails",
        {
          withCredentials: true,
        }
      );

      setDonorContactForm(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    handleIncrement,
    handleDecrement,
    getDonorDetails,
    handleImageUpload,
    donorContactForm,
    foodDonationForm,
    handleFoodDonation,
  };

  return (
    <DontationContext.Provider value={value}>
      {children}
    </DontationContext.Provider>
  );
};
