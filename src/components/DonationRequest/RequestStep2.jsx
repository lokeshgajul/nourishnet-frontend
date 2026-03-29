import React, { useState } from "react";
import { useContext } from "react";
import { DontationContext } from "../../context/FoodDonationContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  BiChevronLeft,
  BiCheckShield,
  BiUserCircle,
  BiPhoneCall,
  BiMailSend,
} from "react-icons/bi";

const RequestStep2 = ({ onBack }) => {
  const { donorData, foodDonationForm } = useContext(DontationContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("donorId", donorData._id);
    formData.append("foodTitle", foodDonationForm.foodTitle);
    formData.append("foodImage", foodDonationForm.imageFile);
    formData.append("foodCategory", foodDonationForm.foodCategory);
    formData.append("foodQuantity", foodDonationForm.foodQuantity);
    formData.append("foodDescription", foodDonationForm.foodDescription);
    formData.append("donorName", donorData.donorName);
    formData.append("donorPhone", donorData.phone);
    formData.append("donorAddress", donorData.address);
    formData.append("donationStatus", "Pending");
    formData.append("expiresAt", foodDonationForm.expiresAt);

    try {
      await axios.post(
        "https://nourishnet-backend-tau.vercel.app/donor/donations",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      navigate("/");
    } catch (error) {
      console.error("Error submitting donation:", error.message);
      alert("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const InfoCard = ({ icon: Icon, label, value }) => (
    <div className="flex items-center gap-6 p-6 bg-emerald-50/50 border border-emerald-100/50 rounded-3xl group hover:bg-white hover:shadow-xl transition-all duration-500">
      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
        <Icon size={24} />
      </div>
      <div className="text-left">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-950 mb-1">
          {label}
        </p>
        <p className="text-emerald-950 font-black tracking-tight text-lg">
          {value || "N/A"}
        </p>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-10">
      <div className="text-left">
        <h3 className="text-2xl font-black text-emerald-900 tracking-tight">
          Step 2: Review & Verify
        </h3>
        <p className="text-emerald-950 font-black text-sm mt-1 uppercase tracking-wide">
          Please audit your contact information before final deployment.
        </p>
        <div className="w-12 h-1 bg-primary rounded-full mt-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoCard
          icon={BiUserCircle}
          label="Origin Name"
          value={donorData.donorName}
        />
        <InfoCard
          icon={BiPhoneCall}
          label="Comms Channel"
          value={donorData.phone}
        />
        <div className="md:col-span-2">
          <InfoCard
            icon={BiMailSend}
            label="Digital Node"
            value={donorData.email}
          />
        </div>
      </div>

      <div className="p-8 bg-emerald-900 rounded-[32px] text-left relative overflow-hidden">
        <BiCheckShield className="absolute top-1/2 right-10 -translate-y-1/2 text-[180px] text-white/5 pointer-events-none" />
        <div className="relative z-10">
          <h4 className="text-white font-black text-lg mb-2">
            Final Confirmation
          </h4>
          <p className="text-emerald-200/60 text-sm font-medium leading-relaxed max-w-md">
            By submitting, you confirm that the food items are safe for
            consumption and match the description provided in Step 1.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 bg-emerald-50 text-emerald-900 font-black py-5 rounded-[24px] hover:bg-emerald-100 transition-all uppercase tracking-widest text-[11px] flex items-center justify-center gap-2"
        >
          <BiChevronLeft size={20} /> Back to Audit
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-[2] bg-emerald-900 hover:bg-primary text-white font-black py-5 rounded-[24px] shadow-xl hover:shadow-impact transition-all duration-300 uppercase tracking-[0.2em] text-[11px]"
        >
          {isSubmitting ? "Processing Mission..." : "Broadcast Donation"}
        </button>
      </div>
    </form>
  );
};

export default RequestStep2;
