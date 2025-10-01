import axios from "axios";
import React, { createContext, useCallback, useState } from "react";

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
  const [userDonations, setUserDonations] = useState([]);
  const [donationDetails, setDonationDetails] = useState();
  const [deleted, setDeleted] = useState(false);

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

  const getDonorDetails = useCallback(async () => {
    try {
      if (donorData) return donorData;

      setLoading(true);
      const response = await axios.get("http://localhost:3000/donor/details", {
        withCredentials: true,
      });

      const data = await response.data;
      setdonorData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [donorData]);

  const getUserDonations = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/donor/donations/${donorData._id}`
      );

      const data = response.data;
      console.log(data);
      setUserDonations(data.donor_donations);
    } catch (error) {
      console.log(error);
    }
  };

  const getDonationsDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/donation/${id}`);

      const data = response.data;
      // console.log("details ", data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    handleIncrement,
    handleDecrement,
    getDonorDetails,
    handleImageUpload,
    foodDonationForm,
    handleFoodDonation,
    loading,
    deleted,
    setDeleted,
    donorData,
    userDonations,
    getDonationsDetails,
    getUserDonations,
    donationDetails,
    setDonationDetails,
  };

  return (
    <DontationContext.Provider value={value}>
      {children}
    </DontationContext.Provider>
  );
};
