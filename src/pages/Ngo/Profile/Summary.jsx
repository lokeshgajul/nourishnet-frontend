import React from "react";
import { BiTask, BiCheckDouble, BiInfoCircle } from "react-icons/bi";

function StatCard({ title, value, icon: Icon, colorClass }) {
  return (
    <div className="bg-white rounded-[40px] p-8 shadow-bento border border-emerald-50 relative overflow-hidden group hover:shadow-impact transition-all duration-500">
      <div className={`absolute top-0 right-0 w-32 h-32 ${colorClass} opacity-5 rounded-bl-[100px] group-hover:scale-125 transition-transform duration-700`} />
      <div className="relative z-10">
        <div className={`w-14 h-14 rounded-2xl ${colorClass} bg-opacity-10 flex items-center justify-center mb-6 text-3xl transition-transform group-hover:scale-110`}>
          <Icon className={colorClass.replace('bg-', 'text-')} />
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-900/40 mb-2">{title}</p>
        <div className="text-5xl font-black text-emerald-900 tracking-tighter">
          {value || 0}
        </div>
      </div>
    </div>
  );
}

export default function DonationSummary({ claimedDonations = [] }) {
  const getClaimedCount = () => {
    return claimedDonations.filter((item) => item.status === "Claimed").length;
  };
  
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <StatCard 
        title="Impact Missions" 
        value={claimedDonations?.length} 
        icon={BiTask}
        colorClass="bg-primary"
      />
      <StatCard 
        title="Completed Transfers" 
        value={getClaimedCount()} 
        icon={BiCheckDouble}
        colorClass="bg-indigo-500"
      />
      <StatCard 
        title="Network Health" 
        value="100%" 
        icon={BiInfoCircle}
        colorClass="bg-amber-500"
      />
    </div>
  );
}
