import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { DontationContext } from "../../context/FoodDonationContext";
import { useNavigate, useParams } from "react-router-dom";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import {
  BiTask,
  BiShieldQuarter,
  BiTimeFive,
  BiUserCircle,
  BiSpreadsheet,
  BiChevronRight,
} from "react-icons/bi";

const RequestFood = () => {
  const [details, setDetails] = useState();
  const { getDonationsDetails, donationDetails } = useContext(DontationContext);
  const [teamSize, setTeamSize] = useState();
  const [time, setTime] = useState();
  const { id } = useParams();
  const decodedId = atob(id);
  const navigate = useNavigate();

  const getNgoDetails = async () => {
    try {
      const response = await axios.get(
        `https://nourishnet-backend-tau.vercel.app/ngo/details/`,
        {
          withCredentials: true,
        },
      );
      setDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDonationDetails = async () => {
    try {
      await getDonationsDetails(decodedId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleDonationDetails();
    getNgoDetails();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [decodedId]);

  const handleFoodClaimRequest = async (e) => {
    e.preventDefault();
    try {
      let IsoTime = null;
      if (time) {
        const dateObj = new Date(time);
        IsoTime = dateObj.toISOString();
      }

      const payload = {
        ngoId: details._id,
        ngoName: details.ngoName,
        ngoContactNo: details.phone,
        ngoEmail: details.email,
        ngoAddress: details.address,
        foodTitle: donationDetails.foodTitle,
        foodImage: donationDetails.foodImage,
        foodDescription: donationDetails.foodDescription,
        foodPickUpTime: IsoTime,
        teamSize: teamSize,
        donationId: donationDetails._id,
        donorName: donationDetails.donorName,
        donorPhone: donationDetails.donorPhone,
        donorAddress: donationDetails.donorAddress,
        donationStatus: "Claimed",
      };
      await axios.post(
        `https://nourishnet-backend-tau.vercel.app/ngo/claim/`,
        payload,
        {
          withCredentials: true,
        },
      );
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const inputClasses =
    "w-full bg-emerald-50/50 border-2 border-emerald-100/50 rounded-2xl px-6 py-4 text-emerald-950 font-black placeholder:text-emerald-900/40 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none";
  const labelClasses =
    "text-[11px] font-black uppercase tracking-[0.2em] text-emerald-950 mb-2 ml-4 block";

  return (
    <div className="bg-[#d1fae5] min-h-screen pb-20 pt-32">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px] -mr-40 -mt-20 opacity-70" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[130px] -ml-20 -mb-20 opacity-50" />
      </div>

      <div className="max-w-4xl mx-auto px-6 animate-in fade-in slide-in-from-bottom-10 duration-700">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
            <BiTask /> Mission Acquisition Protocol
          </div>
          <h1 className="text-4xl lg:text-6xl font-black text-emerald-900 tracking-tight mb-4">
            Claim Food <span className="text-primary italic">Request</span>
          </h1>
          <p className="text-emerald-800/60 font-medium max-w-2xl mx-auto leading-relaxed">
            Kindly provide the details to claim this food donation. Please
            ensure all required fields are accurately filled for mission
            success.
          </p>
        </div>

        <div className="bg-white rounded-[40px] shadow-impact border border-emerald-50 overflow-hidden divide-y divide-emerald-50">
          {/* Section 1: NGO Identity */}
          <div className="p-8 lg:p-12">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 bg-emerald-900 rounded-xl flex items-center justify-center text-white">
                <BiShieldQuarter size={20} />
              </div>
              <h2 className="text-xl font-black text-emerald-900 tracking-tight text-left">
                NGO Identification
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col">
                <label className={labelClasses}>Organization Name</label>
                <input
                  type="text"
                  readOnly
                  value={details?.ngoName || ""}
                  className={inputClasses}
                />
              </div>
              <div className="flex flex-col">
                <label className={labelClasses}>Operational Phone</label>
                <input
                  type="tel"
                  readOnly
                  value={details?.phone || ""}
                  className={inputClasses}
                />
              </div>
              <div className="md:col-span-2 flex flex-col">
                <label className={labelClasses}>Digital Node (Email)</label>
                <input
                  type="email"
                  readOnly
                  value={details?.email || ""}
                  className={inputClasses}
                />
              </div>
            </div>
          </div>

          {/* Section 2: Logistics Details */}
          <div className="p-8 lg:p-12 bg-emerald-50/20">
            <div className="flex items-center gap-3 mb-10 text-left">
              <div className="w-10 h-10 bg-emerald-900 rounded-xl flex items-center justify-center text-white">
                <BiTimeFive size={20} />
              </div>
              <h2 className="text-xl font-black text-emerald-900 tracking-tight">
                Mission Logistics
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col text-left">
                <label className={labelClasses}>Preferred Pickup Window</label>
                <Datetime
                  value={time}
                  dateFormat={false}
                  timeFormat="hh:mm A"
                  onChange={(val) => setTime(val)}
                  inputProps={{
                    placeholder: "Select Time Slot",
                    className: inputClasses,
                  }}
                />
              </div>
              <div className="flex flex-col">
                <label className={labelClasses}>Team Unit Size</label>
                <input
                  type="number"
                  value={teamSize || ""}
                  onChange={(e) => setTeamSize(e.target.value)}
                  placeholder="e.g. 2 members"
                  className={inputClasses}
                />
              </div>
              <div className="flex flex-col">
                <label className={labelClasses}>Origin Node (Donor)</label>
                <div className="flex items-center gap-4 bg-white border-2 border-emerald-100 rounded-2xl px-6 py-4 shadow-sm">
                  <BiUserCircle size={24} className="text-primary" />
                  <span className="text-emerald-900 font-bold">
                    {donationDetails?.donorName || "Scanning..."}
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <label className={labelClasses}>Direct Comms</label>
                <div className="flex items-center gap-4 bg-white border-2 border-emerald-100 rounded-2xl px-6 py-4 shadow-sm">
                  <BiSpreadsheet size={24} className="text-primary" />
                  <span className="text-emerald-900 font-bold">
                    {donationDetails?.donorPhone || "Node Hidden"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Final Authorization */}
          <div className="p-8 lg:p-12 text-left">
            <div className="bg-emerald-900 text-white rounded-[32px] p-8 lg:p-10 relative overflow-hidden">
              <BiShieldQuarter className="absolute top-1/2 right-0 -translate-y-1/2 text-[200px] text-white/5 pointer-events-none" />
              <div className="relative z-10">
                <h3 className="text-2xl font-black tracking-tight mb-4">
                  Mission Confirmation
                </h3>
                <p className="text-emerald-100/70 font-medium text-sm leading-relaxed mb-8 max-w-xl">
                  By clicking "Initialize Claim", you confirm authorization to
                  capture this donation and take full responsibility for its
                  secure collection and distribution protocol.
                </p>
                <button
                  onClick={handleFoodClaimRequest}
                  className="w-full bg-primary hover:bg-emerald-400 text-white font-black py-5 rounded-2xl shadow-xl transition-all duration-300 uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-2 group"
                >
                  Initialize Claim Mission{" "}
                  <BiChevronRight className="text-xl group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-emerald-900/30 mt-12">
          Secure Claim Protocol Active // NourishNet v2.6.0
        </p>
      </div>
    </div>
  );
};

export default RequestFood;
