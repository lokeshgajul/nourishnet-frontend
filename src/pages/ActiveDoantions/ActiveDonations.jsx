import React, { useEffect, useState } from "react";
import axios from "axios";
import FoodDonationCard from "../../components/FoodCard/FoodCard";

const ActiveDonations = ({ donorData }) => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const getActiveDonations = async () => {
    try {
      const res = await axios.get("http://localhost:3000/donations", {
        withCredentials: true,
      });
      setDonations(res.data.donations); // assuming API returns { donations: [...] }
    } catch (error) {
      console.error("Error fetching active donations", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getActiveDonations();
  }, []);

  if (loading) return <p>Loading active donations...</p>;

  return <FoodDonationCard donations={donations} donorData={donorData} />;
};

export default ActiveDonations;
