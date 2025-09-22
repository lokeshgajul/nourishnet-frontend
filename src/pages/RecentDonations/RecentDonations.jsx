import React, { useEffect, useContext } from "react";
import { DontationContext } from "../../context/FoodDonationContext";
import FoodDonationCard from "../../components/FoodCard/FoodCard";
import CardSkeleton from "../../components/LoadingSkeleton/Card";

const RecentDonations = () => {
  const { donorData, loading, getRecentDoantions, donationData, deleted } =
    useContext(DontationContext);

  useEffect(() => {
    if (donorData?._id) {
      getRecentDoantions();
    }
  }, [donorData, deleted]);

  if (loading) return <CardSkeleton />;

  return <FoodDonationCard donations={donationData} donorData={donorData} />;
};

export default RecentDonations;
