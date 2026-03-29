import React from "react";
import { BiTime, BiDetail, BiLayer } from "react-icons/bi";
import { Link } from "react-router-dom";

const History = ({ userDonation = [] }) => {
  return (
    <div className="bg-white rounded-[40px] shadow-bento border border-emerald-50 overflow-hidden">
      <div className="p-10 border-b border-emerald-50 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-emerald-900 tracking-tight">
            Donation History
          </h2>
          <p className="text-emerald-800/40 text-[10px] font-black uppercase tracking-widest mt-1 italic">Historical Data Ledger</p>
        </div>
        <div className="hidden sm:block">
          <span className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl text-xs font-bold border border-emerald-100 italic">
            {userDonation.length} Entries Recorded
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-10">
        {userDonation.map((donation, index) => (
          <div
            key={index}
            className="group bg-emerald-50/30 rounded-[32px] overflow-hidden border border-emerald-50/50 hover:bg-white hover:shadow-xl hover:scale-[1.02] transition-all duration-500"
          >
            <div className="relative h-48 overflow-hidden">
              <div className="absolute top-4 right-4 z-10">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg ${
                  donation?.donationStatus === "Pending"
                    ? "bg-amber-500 text-white"
                    : "bg-primary text-white"
                }`}>
                  {donation?.donationStatus}
                </span>
              </div>
              <img
                src={donation?.foodImage || "/placeholder.svg"}
                alt={donation?.foodTitle}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            
            <div className="p-7">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest flex items-center gap-1">
                  <BiLayer /> {donation.foodCategory}
                </span>
                <span className="text-[10px] font-bold text-emerald-900/40 flex items-center gap-1">
                  <BiTime /> {new Date(donation.createdAt).toLocaleDateString()}
                </span>
              </div>
              
              <h3 className="text-xl font-black text-emerald-900 mb-2 truncate">
                {donation?.foodTitle}
              </h3>
              
              <p className="text-emerald-800/60 text-sm font-bold leading-relaxed line-clamp-2 mb-6">
                {donation.foodDescription}
              </p>

              <Link to={`/donation/${btoa(donation._id)}`} className="block">
                <button className="w-full flex items-center justify-center gap-2 bg-white text-emerald-900 font-black py-4 rounded-2xl border border-emerald-100 hover:bg-emerald-900 hover:text-white hover:border-emerald-900 transition-all text-xs uppercase tracking-widest">
                  <BiDetail className="text-lg" /> Audit Mission
                </button>
              </Link>
            </div>
          </div>
        ))}

        {userDonation.length === 0 && (
          <div className="col-span-full py-20 text-center text-emerald-900/20 italic">
            No historical entries found in your account.
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
