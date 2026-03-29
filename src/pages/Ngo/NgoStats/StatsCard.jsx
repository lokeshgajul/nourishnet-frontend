import React from "react";
import { BiLeaf, BiDonateHeart, BiGlobe } from "react-icons/bi";

const StatsCard = () => {
  const statsData = [
    {
      id: 1,
      title: "Impact Volume",
      stats: "1,840 KG",
      desc: "Massive food rescue operational success.",
      icon: BiLeaf,
      color: "bg-emerald-500"
    },
    {
      id: 2,
      title: "Live Channels",
      stats: "12",
      desc: "Active donation signals currently online.",
      icon: BiDonateHeart,
      color: "bg-amber-500"
    },
    {
      id: 3,
      title: "Node Nexus",
      stats: "89",
      desc: "Verified donors across the global network.",
      icon: BiGlobe,
      color: "bg-indigo-500"
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
      {statsData.map((item) => (
        <div
          key={item.id}
          className="group bg-white rounded-[40px] p-8 shadow-bento hover:shadow-impact border border-emerald-50 relative overflow-hidden transition-all duration-500 hover:scale-[1.02]"
        >
          <div className={`absolute top-0 right-0 w-32 h-32 ${item.color} opacity-5 rounded-bl-[100px] group-hover:scale-125 transition-transform duration-700`} />
          
          <div className="relative z-10">
            <div className={`w-14 h-14 rounded-2xl ${item.color} bg-opacity-10 flex items-center justify-center mb-6 text-3xl text-emerald-900 transition-transform group-hover:scale-110`}>
              <item.icon className={item.color.replace('bg-', 'text-')} />
            </div>
            
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-900/40 mb-2">{item.title}</p>
            <div className="text-4xl font-black text-emerald-900 tracking-tighter mb-2 italic">
              {item.stats}
            </div>
            
            <p className="text-emerald-800/60 text-xs font-bold leading-relaxed">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCard;
