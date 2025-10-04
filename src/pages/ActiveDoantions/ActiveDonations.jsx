import React, { useEffect, useState } from "react";
import axios from "axios";
import FoodDonationCard from "../../components/FoodCard/FoodCard";
import { useContext } from "react";
import { DontationContext } from "../../context/FoodDonationContext";
import CardSkeleton from "../../components/LoadingSkeleton/Card";

const ActiveDonations = ({ donorData }) => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { deleted } = useContext(DontationContext);

  const getActiveDonations = async () => {
    try {
      const res = await axios.get(
        "https://nourishnet-backend.vercel.app/donations",
        {
          withCredentials: true,
        }
      );
      setDonations(res.data.donations);
    } catch (error) {
      console.error("Error fetching active donations", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getActiveDonations();
  }, [deleted]);

  if (loading) return <CardSkeleton />;

  return <FoodDonationCard donations={donations} donorData={donorData} />;
};

export default ActiveDonations;
