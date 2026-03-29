import React from "react";
import DonationSummary from "./Summary";
import DonationHistory from "./History";
import { useContext } from "react";
import { DontationContext } from "../../context/FoodDonationContext";
import { useEffect } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CiCamera } from "react-icons/ci";
import {
  BiLogOutCircle,
  BiUserCircle,
  BiShield,
  BiMapPin,
  BiPhoneCall,
} from "react-icons/bi";
import axios from "axios";

const Profile = () => {
  const {
    donorData,
    getDonorDetails,
    getUserDonations,
    userDonations,
    deleted,
  } = useContext(DontationContext);

  const { logout, verfiyCookie } = useContext(AuthContext);
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  const handleLogout = async () => {
    const result = await logout();
    navigate("/");
    if (result === false) {
      await verfiyCookie();
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append("profileImage", file);
    try {
      const { data } = await axios.post(
        "https://nourishnet-backend-tau.vercel.app/upload-profile",
        formData,
        { withCredentials: true },
      );
      if (data.success) {
        setPreview(data.profileImage);
        getDonorDetails();
      }
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  const profileImageToShow =
    preview ||
    donorData?.profileImage ||
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/donor-profile-picture-MeIUI9bNiRfX0t5CqUTDhnzG3q3jxU.jpg";

  useEffect(() => {
    if (!donorData) getDonorDetails();
  }, [donorData, getDonorDetails]);

  useEffect(() => {
    if (donorData?._id) getUserDonations();
  }, [donorData, deleted]);

  return (
    <div className="bg-[#d1fae5] min-h-screen">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px] -mr-40 -mt-20 opacity-70" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[130px] -ml-20 -mb-20 opacity-50" />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-32 pb-20">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Sidebar: Profile Summary */}
          <div className="w-full lg:w-[380px] lg:sticky lg:top-32 transition-all">
            <div className="bg-white rounded-[40px] shadow-impact border border-emerald-50 p-8 text-center animate-in fade-in slide-in-from-bottom-10 duration-500">
              <div className="relative group mx-auto mb-8 w-40 h-40">
                <div className="w-full h-full rounded-[48px] overflow-hidden border-8 border-emerald-50 shadow-inner group-hover:rotate-0 rotate-3 transition-transform duration-500">
                  <img
                    src={profileImageToShow}
                    alt="Profile"
                    className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                  />
                </div>
                <label
                  htmlFor="profileImage"
                  className="absolute -bottom-2 -right-2 bg-primary text-white p-3 rounded-2xl shadow-xl cursor-pointer hover:scale-110 transition-all border-4 border-white"
                >
                  <CiCamera size={24} />
                  <input
                    type="file"
                    id="profileImage"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                <BiShield /> Verified Donor
              </div>
              <h1 className="text-3xl font-black text-emerald-900 tracking-tight mb-1">
                {donorData?.donorName}
              </h1>
              <p className="text-emerald-800/40 font-bold text-sm mb-8">
                {donorData?.email}
              </p>

              <div className="space-y-4 text-left border-t border-emerald-50 pt-8 mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-primary">
                    <BiPhoneCall size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-emerald-900/30 uppercase tracking-widest leading-none mb-1">
                      Comms Protocol
                    </p>
                    <p className="text-sm font-bold text-emerald-900">
                      {donorData?.phone || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-primary mt-0.5">
                    <BiMapPin size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-emerald-900/30 uppercase tracking-widest leading-none mb-1">
                      Base Vector
                    </p>
                    <p className="text-xs font-bold text-emerald-900 leading-tight">
                      {donorData?.address || "Global HQ"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 bg-emerald-50 text-emerald-900 font-black px-4 py-4 rounded-2xl hover:bg-emerald-100 transition-all text-[11px] uppercase tracking-widest">
                  <IoSettingsOutline size={18} /> Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 bg-red-50 text-red-600 font-black px-4 py-4 rounded-2xl hover:bg-red-600 hover:text-white transition-all text-[11px] uppercase tracking-widest"
                >
                  <BiLogOutCircle size={18} /> Logout
                </button>
              </div>
            </div>
          </div>

          {/* Main Dashboard: Stats & History Unified */}
          <div className="flex-1 w-full space-y-10 animate-in fade-in slide-in-from-right-10 duration-700">
            {/* Unified Header */}
            <div className="mb-2">
              <h2 className="text-4xl font-black text-emerald-900 tracking-tight">
                Donation Dashboard
              </h2>
              <p className="text-emerald-800/40 font-bold uppercase tracking-widest text-[10px] mt-2 italic">
                Real-time Network Activity Ledger
              </p>
            </div>

            {/* Stats Grid */}
            <div className="w-full">
              <DonationSummary userDonation={userDonations} />
            </div>

            {/* History Section */}
            <div className="w-full">
              <DonationHistory
                donorData={donorData}
                userDonation={userDonations}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
