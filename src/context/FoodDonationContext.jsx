import axios from "axios";
import React, { createContext, useState } from "react";

export const DontationContext = createContext();

export const FoodDonationProvider = ({ children }) => {
  const [count, setCount] = useState(1);
  const [preview, setPreview] = useState(null);
  const [foodTitle, setFoodTitle] = useState("");
  const [foodCategory, setFoodCategory] = useState("");
  const [donorData, setDonorData] = useState("");

  const handleIncrement = () => {
    setCount(count + 1);
  };
  const handleDecrement = () => {
    setCount(count - 1);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
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

      setDonorData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    count,
    preview,
    handleIncrement,
    handleDecrement,
    handleImageUpload,
    setFoodCategory,
    setFoodTitle,
    foodTitle,
    getDonorDetails,
    donorData,
  };

  return (
    <DontationContext.Provider value={value}>
      {children}
    </DontationContext.Provider>
  );
};
