import React, { lazy, Suspense, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomeImg from "../../../assets/images/ngoHome.jpeg";
import NGoStats from "../NgoStats/StatsCard";
import { DontationContext } from "../../../context/FoodDonationContext";
import ActiveDonations from "../../ActiveDoantions/ActiveDonations";
import ClaimedDonations from "../ClaimedDonations/ClaimedDonations";
import { NgoContext } from "../../../context/NgoContext";
import { BiHeart, BiHistory, BiRocket } from "react-icons/bi";

const Home = () => {
  const { donorData } = useContext(DontationContext);
  const { getNgoDetails, ngoDetails } = useContext(NgoContext);

  useEffect(() => {
    getNgoDetails();
  }, []);

  return (
    <div className="bg-[#d1fae5] min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white/40 backdrop-blur-3xl border-b border-emerald-200/50">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -mr-32 -mt-32 opacity-70" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-center flex-row pt-32 md:pt-40 pb-20 max-[1000px]:flex-col max-lg:items-center relative z-10 animate-fade-in-up">
          <div className="flex-1 flex justify-center flex-col max-lg:items-center px-4 lg:px-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
              <BiRocket /> Mission Deployment Hub
            </div>
            <h1 className="max-lg:text-4xl text-emerald-900 lg:text-6xl font-black lg:pt-2 text-center lg:text-left tracking-tight">
              <span className="text-primary italic">Welcome, </span>
              {ngoDetails?.ngoName || "NourishNet"}
            </h1>

            <p className="pt-6 lg:text-xl text-lg text-center lg:text-left text-emerald-800/70 font-medium max-w-xl">
              At NourishNet, we connect surplus food with those in need,
              reducing food waste while feeding communities across our cities.
              Your support makes a real difference every day.
            </p>
          </div>

          <div className="flex-1 flex justify-center px-4 lg:px-8 relative">
            <div className="absolute inset-0 bg-primary/10 blur-[120px] rounded-full scale-75 animate-pulse" />
            <img
              src={HomeImg}
              alt="NourishNet Home"
              className="w-full max-w-md rounded-[40px] object-cover shadow-2xl relative z-20 border-8 border-white h-80"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-24 max-w-7xl mx-auto px-6 lg:px-12">
        <NGoStats />
      </div>

      {/* Active Food Donation Requests */}
      <div className="relative py-24 bg-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-50 rounded-full blur-[150px] -z-10" />
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-primary font-black uppercase text-xs tracking-widest mb-2">Live Availability</p>
              <h2 className="text-3xl lg:text-5xl font-black text-emerald-900 tracking-tight flex items-center gap-3">
                <BiHeart className="text-primary" /> Active Feed Signals
              </h2>
            </div>
          </div>

          <div className="py-6">
            <Suspense fallback={<div className="h-96 flex items-center justify-center font-black text-emerald-900/20 uppercase tracking-widest">Scanning Network...</div>}>
              <ActiveDonations donorData={donorData} />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Claimed Donations History */}
      <div className="py-24 bg-emerald-50/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-black text-emerald-900 tracking-tight mb-4 flex items-center justify-center gap-4">
              <BiHistory className="text-primary" /> Claim History
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
          </div>

          <div className="py-6">
            <Suspense fallback={<div className="h-48 flex items-center justify-center font-black text-emerald-900/20 uppercase tracking-widest">Retrieving Ledger...</div>}>
              <ClaimedDonations />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
