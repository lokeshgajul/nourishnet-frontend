import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiLayer, BiChevronRight, BiUser, BiLeaf, BiTimeFive } from "react-icons/bi";

const CountdownTimer = ({ expiresAt }) => {
  const [timeLeft, setTimeLeft] = useState("");
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (!expiresAt) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const expiry = new Date(expiresAt).getTime();
      const distance = expiry - now;

      if (distance < 0) {
        setIsExpired(true);
        setTimeLeft("Expired");
        clearInterval(interval);
      } else {
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  if (!expiresAt) return null;

  return (
    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md ${isExpired ? 'bg-red-900/80 text-red-50 border border-red-500/30' : 'bg-amber-900/80 text-amber-50 border border-amber-500/30'}`}>
      <BiTimeFive className="text-sm" />
      {isExpired ? "Expired" : `${timeLeft}`}
    </div>
  );
};

const FoodDonationCard = ({ donations = [] }) => {
  const filterDonations = donations.filter(
    (item) => item.donationStatus === "Pending"
  );

  if (!filterDonations.length) {
    return (
      <div className="w-full py-20 text-center bg-emerald-50/50 rounded-[40px] border-2 border-dashed border-emerald-100">
        <BiLeaf className="text-4xl text-emerald-200 mx-auto mb-4" />
        <p className="text-emerald-900/40 font-black uppercase tracking-widest text-xs">No active nodes detected in this sector</p>
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {donations?.slice(0, 3).map((item, id) => (
        <div
          key={id}
          className="group bg-white rounded-[32px] shadow-bento hover:shadow-impact hover:scale-[1.02] transition-all duration-500 flex flex-col overflow-hidden border border-emerald-50/50"
        >
          {/* Image Container with Overlay */}
          <div className="relative w-full h-56 bg-emerald-50 overflow-hidden">
            <div className="absolute top-4 right-4 z-20">
              <CountdownTimer expiresAt={item.expiresAt} />
            </div>
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-emerald-900/80 backdrop-blur-md text-emerald-50 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-1.5 border border-white/10">
                <BiLayer /> {item.foodCategory}
              </span>
            </div>
            <img
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              src={item.foodImage}
              alt={item.foodTitle || "food"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Content Area */}
          <div className="flex flex-col flex-grow p-7">
            <div className="flex-grow">
              <h3 className="text-xl font-black text-emerald-900 mb-3 tracking-tight group-hover:text-primary transition-colors">
                {item.foodTitle}
              </h3>
              <p className="text-emerald-800/60 text-sm font-medium leading-relaxed line-clamp-2 mb-6">
                {item.foodDescription}
              </p>

              <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-primary">
                  <BiUser size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-emerald-900/30 uppercase tracking-widest leading-none mb-1">Origin Node</p>
                  <p className="text-sm font-bold text-emerald-900 truncate max-w-[150px]">{item.donorName}</p>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <Link to={`/donation/${btoa(item._id)}`} className="block">
              <button className="w-full bg-emerald-50 text-emerald-900 font-black py-4 rounded-2xl flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-white transition-all duration-300 uppercase tracking-widest text-[11px]">
                Access Details <BiChevronRight className="text-lg group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoodDonationCard;
