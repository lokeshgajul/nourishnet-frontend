import axios from "axios";
import React, { createContext, useState } from "react";
import { useEffect } from "react";

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
  const [donorData, setdonorData] = useState();
  const [loading, setLoading] = useState(false);

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
      if (donorData) return donorData;

      setLoading(true);
      const response = await axios.get(
        "http://localhost:3000/donations/donor/getDonorDetails",
        {
          withCredentials: true,
        }
      );

      const data = await response.data;
      setdonorData(data);
      setLoading(false);
      console.log("donor details ", data);
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    handleIncrement,
    handleDecrement,
    getDonorDetails,
    handleImageUpload,
    donorData,
    foodDonationForm,
    handleFoodDonation,
    loading,
  };

  return (
    <DontationContext.Provider value={value}>
      {children}
    </DontationContext.Provider>
  );
};
