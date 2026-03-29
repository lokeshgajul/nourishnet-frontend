import React, { useContext, useEffect } from "react";
import { NgoContext } from "../../../context/NgoContext";
import DonationSummary from "./Summary";
import DonationHistory from "./History";
import { CiMail, CiCamera } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  BiLogOutCircle,
  BiBuildings,
  BiPhoneCall,
  BiMapPin,
  BiShieldQuarter,
} from "react-icons/bi";
import axios from "axios";

const Profile = () => {
  const { ngoDetails, getNgoDetails, claimedRequests, getAllClaimedReqeusts } =
    useContext(NgoContext);
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
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        },
      );

      if (data.success) {
        setPreview(data.profileImage);
        getNgoDetails();
      }
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  const profileImageToShow =
    preview ||
    ngoDetails?.profileImage ||
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/donor-profile-picture-MeIUI9bNiRfX0t5CqUTDhnzG3q3jxU.jpg";

  useEffect(() => {
    getNgoDetails();
  }, [preview]);

  useEffect(() => {
    getAllClaimedReqeusts();
  }, []);

  return (
    <div className="bg-[#d1fae5] min-h-screen">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px] -mr-40 -mt-20 opacity-70" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[130px] -ml-20 -mb-20 opacity-50" />
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-32 pb-20">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Left Side: NGO Profile Section (FIXED SHIFT) */}
          <div className="w-full lg:w-[400px] lg:sticky lg:top-32 transition-all">
            <div className="bg-white rounded-[40px] shadow-impact border border-emerald-50 p-8 text-center animate-in fade-in slide-in-from-bottom-10 duration-500 overflow-hidden">
              <div className="relative group mx-auto mb-8 w-44 h-44">
                <div className="w-full h-full rounded-[48px] overflow-hidden border-8 border-emerald-50 shadow-inner group-hover:rotate-0 rotate-3 transition-transform duration-500">
                  <img
                    src={profileImageToShow}
                    alt="NGO Profile"
                    className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                  />
                </div>
                <label
                  htmlFor="profileImageUpload"
                  className="absolute -bottom-2 -right-2 bg-primary text-white p-4 rounded-2xl shadow-xl cursor-pointer hover:scale-110 transition-all border-4 border-white"
                >
                  <CiCamera size={24} />
                  <input
                    type="file"
                    id="profileImageUpload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                <BiShieldQuarter /> Verified Organization
              </div>
              <h1 className="text-3xl font-black text-emerald-900 tracking-tight mb-1">
                {ngoDetails?.ngoName}
              </h1>
              <p className="text-emerald-800/40 font-bold text-sm mb-8 flex items-center justify-center gap-2">
                <CiMail /> {ngoDetails?.email}
              </p>

              <div className="space-y-4 text-left border-t border-emerald-50 pt-8 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-primary shrink-0">
                    <BiPhoneCall size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-emerald-900/30 uppercase tracking-widest leading-none mb-1">
                      Comms Protocol
                    </p>
                    <p className="text-sm font-bold text-emerald-900">
                      {ngoDetails?.phone || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <BiMapPin size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-emerald-900/30 uppercase tracking-widest leading-none mb-1">
                      Impact Vector
                    </p>
                    <p className="text-xs font-bold text-emerald-900 leading-tight">
                      {ngoDetails?.address || "Global NGO Network"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bio Section */}
              <div className="bg-emerald-50/50 rounded-3xl p-6 text-left mb-10">
                <p className="text-[10px] font-black text-emerald-900/30 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <BiBuildings /> Organizational Briefing
                </p>
                <p className="text-emerald-900/70 text-sm font-medium leading-relaxed italic">
                  "{ngoDetails?.bio || "No mission briefing provided yet."}"
                </p>
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

          {/* Right Side: Dashboard Section (SCROLLING) */}
          <div className="flex-1 w-full space-y-10 animate-in fade-in slide-in-from-right-10 duration-700">
            <div className="mb-2">
              <h2 className="text-4xl font-black text-emerald-900 tracking-tight">
                NGO Command Center
              </h2>
              <p className="text-emerald-800/40 font-bold uppercase tracking-widest text-[10px] mt-2 italic">
                Operation Impact Ledger & Deployment History
              </p>
            </div>

            <div className="w-full">
              <DonationSummary claimedDonations={claimedRequests} />
            </div>

            <div className="w-full">
              <DonationHistory
                ngoDetails={ngoDetails}
                claimedDonations={claimedRequests}
              />
            </div>

            <p className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-emerald-900/30 pt-10">
              NourishNet Organization Protocol v2.6 // Secure NGO Node
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
