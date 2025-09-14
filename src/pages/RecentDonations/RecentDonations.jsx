import React, { useEffect, useContext } from "react";
import { DontationContext } from "../../context/FoodDonationContext";
import FoodDonationCard from "../../components/FoodCard/FoodCard";

const RecentDonations = () => {
  const { donorData, loading, getRecentDoantions, donationData } =
    useContext(DontationContext);

  useEffect(() => {
    if (donorData?._id) {
      getRecentDoantions();
    }
  }, [donorData]);

  if (loading) return <p>Loading recent donations...</p>;

  return <FoodDonationCard donations={donationData} donorData={donorData} />;
};

export default RecentDonations;
