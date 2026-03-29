import React from "react";
import image from "../../assets/images/image.png";
import foodImage from "../../assets/images/food.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { DontationContext } from "../../context/FoodDonationContext";
import { useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import {
  BiTimeFive,
  BiCategoryAlt,
  BiShoppingBag,
  BiUser,
  BiMapPin,
  BiPhone,
  BiTrash,
  BiShield,
} from "react-icons/bi";

function DonationDetails() {
  const { id } = useParams();
  const decodedId = atob(id);
  const {
    getDonationsDetails,
    setDeleted,
    donationDetails,
    setDonationDetails,
  } = useContext(DontationContext);
  const [currentUser, setCurrentUser] = useState();
  const [checkRole, setCheckRole] = useState();
  const navigate = useNavigate();

  const handleDonationDetails = async () => {
    try {
      const data = await getDonationsDetails(decodedId);
      if (data) {
        setDonationDetails(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckRole = async () => {
    try {
      const res = await axios.get(
        "https://nourishnet-backend-tau.vercel.app/user_role",
        {
          withCredentials: true,
        },
      );
      const { role, user } = res.data;
      setCheckRole(role);
      setCurrentUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.post(
        "https://nourishnet-backend-tau.vercel.app/donation/delete",
        { id: decodedId },
      );

      const data = response.data;
      if (data) {
        console.log(`deleted successfully ${decodedId}`);
        setDeleted(true);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDeleted(false);
    }
  };

  useEffect(() => {
    handleCheckRole();
    handleDonationDetails();
  }, [decodedId]);

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      {/* Header Section with Color Block */}
      <section className="bg-emerald-900 pt-32 pb-40 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -mr-20 -mt-20" />
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 relative z-10 animate-fade-in-up">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-emerald-200 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-white/10">
              <BiShield /> Verified Asset Analysis
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-white tracking-tight mb-6">
              Donation Details
            </h1>
            <p className="text-emerald-100/60 text-lg font-medium leading-relaxed max-w-2xl">
              Review detailed information about this donation to ensure
              transparency and efficient distribution to those in need.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-10">
              <Link to="/">
                <button
                  type="button"
                  className="bg-primary hover:bg-primary-dark text-white px-8 py-4 text-sm font-black rounded-2xl shadow-xl shadow-primary/20 transition-all uppercase tracking-widest hover:scale-105"
                >
                  Back To Donations
                </button>
              </Link>
              <button
                type="button"
                className="bg-white/10 border border-white/20 px-8 py-4 text-sm font-black text-white rounded-2xl hover:bg-white/20 transition-all uppercase tracking-widest"
              >
                Volunteer Today
              </button>
            </div>
          </div>

          <div className="w-full lg:w-[400px]">
            <img
              src={image}
              alt="Donation Illustration"
              className="rounded-[40px] shadow-2xl border-4 border-white/10 w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Details Container - Shifted Up */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 -mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Info Card */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white border border-emerald-50 rounded-[40px] shadow-[0_32px_64px_-16px_rgba(6,78,59,0.1)] p-10">
              <div className="flex items-center justify-between mb-10 border-b border-gray-100 pb-8">
                <h3 className="text-2xl font-black text-emerald-900 uppercase tracking-tight">
                  Donation Summary
                </h3>
                <span
                  className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    donationDetails?.donationStatus === "Claimed"
                      ? "bg-primary/10 text-primary"
                      : donationDetails?.donationStatus === "Pending"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {donationDetails?.donationStatus || "Pending"}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-emerald-600/50">
                    <BiTimeFive className="text-lg" />
                    <p className="text-[10px] font-black uppercase tracking-widest">
                      Request Raised
                    </p>
                  </div>
                  <p className="font-bold text-gray-800">
                    {donationDetails?.createdAt
                      ? new Date(donationDetails.createdAt).toLocaleString(
                          undefined,
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          },
                        )
                      : "Not Mentioned"}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-emerald-600/50">
                    <BiTimeFive className="text-lg" />
                    <p className="text-[10px] font-black uppercase tracking-widest">
                      Expires By
                    </p>
                  </div>
                  <p
                    className={`font-bold text-sm ${donationDetails?.expiresAt && new Date(donationDetails.expiresAt) < new Date() ? "text-red-600" : "text-gray-800"}`}
                  >
                    {donationDetails?.expiresAt
                      ? new Date(donationDetails.expiresAt).toLocaleString(
                          undefined,
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )
                      : "Not Mentioned"}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-emerald-600/50">
                    <BiCategoryAlt className="text-lg" />
                    <p className="text-[10px] font-black uppercase tracking-widest">
                      Food Category
                    </p>
                  </div>
                  <p className="font-bold text-gray-800 uppercase text-xs tracking-wider">
                    {donationDetails?.foodCategory || "Not Specified"}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-emerald-600/50">
                    <BiShoppingBag className="text-lg" />
                    <p className="text-[10px] font-black uppercase tracking-widest">
                      Total Items
                    </p>
                  </div>
                  <p className="font-bold text-gray-800">
                    {donationDetails?.foodQuantity || "N/A"}
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-10">
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600/50">
                  Food Description
                </p>
                <p className="font-medium text-emerald-900 leading-relaxed text-lg italic">
                  "
                  {donationDetails?.foodDescription ||
                    "No description provided for this donation."}
                  "
                </p>
              </div>

              <div className="rounded-[32px] overflow-hidden border-8 border-emerald-50 bg-emerald-50">
                <img
                  src={donationDetails?.foodImage || foodImage}
                  alt="Food donation"
                  className="w-full h-[400px] object-cover hover:scale-[1.02] transition-transform duration-700"
                />
              </div>
            </div>
          </div>

          {/* Sidebar Cards */}
          <div className="lg:col-span-4 space-y-6">
            {/* Donor Card */}
            <div className="bg-white border border-emerald-50 rounded-[40px] shadow-xl p-8">
              <h3 className="text-xl font-black text-emerald-900 mb-8 flex items-center gap-2 uppercase tracking-tight">
                <BiUser className="text-primary text-2xl" /> Donor Info
              </h3>
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600/50 mb-1">
                    Entity Name
                  </p>
                  <p className="font-bold text-gray-800 text-lg">
                    {donationDetails?.donorName || "Not Available"}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600/50 mb-1">
                    Entity Type
                  </p>
                  <p className="font-bold text-gray-800">Individual Donor</p>
                </div>
                <div className="flex gap-3">
                  <BiMapPin className="text-primary shrink-0 text-xl mt-1" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600/50 mb-1">
                      Physical Address
                    </p>
                    <p className="font-bold text-gray-800 leading-snug">
                      {donationDetails?.donorAddress || "Not Mentioned"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Card */}
            <div className="bg-emerald-900 rounded-[40px] shadow-2xl p-8 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/40 transition-all" />
              <h3 className="text-xl font-black mb-8 relative z-10 uppercase tracking-tight">
                Active Protocol
              </h3>

              <div className="space-y-8 relative z-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                      <BiPhone className="text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                        Comms Link
                      </p>
                      <p className="font-bold text-emerald-50 tracking-wide">
                        +91 {donationDetails?.donorPhone || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {checkRole === "Donor" ? (
                  donationDetails?.donorId === currentUser?.id && (
                    <button
                      onClick={handleDelete}
                      className="w-full flex items-center justify-center gap-2 rounded-2xl bg-red-500/10 border border-red-500/20 px-6 py-5 font-black text-red-500 hover:bg-red-500 hover:text-white transition-all uppercase tracking-widest text-xs"
                    >
                      <BiTrash className="text-lg" /> Terminate Listing
                    </button>
                  )
                ) : (
                  <Link to={`/claim-food/${btoa(decodedId)}`} className="block">
                    <button className="w-full rounded-2xl bg-primary px-6 py-5 font-black text-white hover:bg-primary-dark transition-all uppercase tracking-widest text-xs shadow-lg shadow-primary/20 hover:scale-[1.02]">
                      Confirm Pickup Confirmation
                    </button>
                  </Link>
                )}
              </div>
            </div>

            <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-emerald-900/40 py-4">
              NourishNet Ledger Node v2.6
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DonationDetails;
