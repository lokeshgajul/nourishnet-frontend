import React, { useEffect, useContext } from "react";
import { DontationContext } from "../../context/FoodDonationContext";
import FoodDonationCard from "../../components/FoodCard/FoodCard";
import CardSkeleton from "../../components/LoadingSkeleton/Card";
import { useState } from "react";

const RecentDonations = () => {
  const { donorData, getUserDonations, userDonations, deleted } =
    useContext(DontationContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (donorData?._id) {
      getUserDonations();
      setLoading(false);
    }
  }, [donorData, deleted]);

  if (loading) return <CardSkeleton />;

  return <FoodDonationCard donations={userDonations} donorData={donorData} />;
};

export default RecentDonations;
