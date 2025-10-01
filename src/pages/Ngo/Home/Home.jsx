import React, { lazy, Suspense, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomeImg from "../../../assets/images/ngoHome.jpeg";
import NGoStats from "../NgoStats/StatsCard";
import { DontationContext } from "../../../context/FoodDonationContext";
import ActiveDonations from "../../ActiveDoantions/ActiveDonations";
import ClaimedDonations from "../ClaimedDonations/ClaimedDonations";
import axios from "axios";
import { NgoContext } from "../../../context/NgoContext";

const FoodDonationCard = lazy(() =>
  import("../../../components/FoodCard/FoodCard")
);

const Home = () => {
  const { donorData } = useContext(DontationContext);
  const { getNgoDetails, ngoDetails } = useContext(NgoContext);

  useEffect(() => {
    getNgoDetails();
  }, []);

  return (
    <div
      style={{
        background: "linear-gradient(to right, #f0f8fc, #f4fbf2, #f0fcf6)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 ">
        <div className=" flex flex-row py-12 pt-24 md:pt-28 max-[1000px]:flex-col max-lg:items-center">
          <div className="flex-1 flex justify-center flex-col max-lg:items-center px-4 lg:px-8">
            <h1 className="max-lg:text-xl lg:text-3xl text-gray-700 font-medium lg:pt-9 text-center lg:text-left">
              <span className="text-green-600">Welcome, </span>
              {ngoDetails?.ngoName}
            </h1>

            <p className="pt-4 lg:text-lg text-sm text-center lg:text-left text-gray-700">
              {ngoDetails?.bio}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
              accusamus sunt nesciunt cum ducimus blanditiis, exercitationem
              distinctio earum magni iusto ratione magnam, aliquid neque dicta
              velit a quasi reiciendis necessitatibus?
            </p>
          </div>

          <div className="flex-1 flex justify-center rounded-md max-[1000px]:mt-6 px-4 lg:px-8">
            <img
              src={HomeImg}
              alt="NourishNet Home"
              className="w-full max-w-md rounded-md object-contain"
            />
          </div>
        </div>

        <div className="w-full py-12 px-4 lg:px-6">
          <NGoStats />
        </div>

        <div className="">
          <div className="">
            <h2 className=" max-lg:text-xl lg:text-3xl font-medium leading-normal">
              Active Food Donation Requests
            </h2>

            <div className="py-12">
              <Suspense fallback={<p>Loading food donations...</p>}>
                <ActiveDonations donorData={donorData} />
              </Suspense>
            </div>
          </div>
        </div>

        <div className="">
          <div className="">
            <h2 className=" max-lg:text-xl lg:text-3xl font-medium leading-normal">
              Claimed Donations History
            </h2>

            <div className="py-12">
              <Suspense fallback={<p>Loading food donations...</p>}>
                <ClaimedDonations />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
