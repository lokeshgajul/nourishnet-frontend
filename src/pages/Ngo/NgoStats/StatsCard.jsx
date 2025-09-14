import React from "react";
import { BiLeaf } from "react-icons/bi";

const StatsCard = () => {
  const statsData = [
    {
      id: 1,
      title: "Total Food Claimed",
      stats: "1,840 kg",
      desc: "Food rescued and distributed",
    },

    {
      id: 2,
      title: "Total Food Claimed",
      stats: "12",
      desc: "Available food donations",
    },
    {
      id: 3,
      title: "Donors Connected",
      stats: "89",
      desc: "Food donors in network",
    },
  ];
  return (
    <div>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {statsData?.map((item, id) => (
            <div
              key={id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 h-full"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 text-green-600 p-3 rounded-full text-2xl">
                  <BiLeaf />
                </div>
                <h3 className="text-lg font-medium text-gray-700">
                  {item.title}
                </h3>
              </div>
              <div className="flex items-center space-x-3 mt-3">
                <h4 className="text-3xl font-bold text-gray-700">
                  {item.stats}
                </h4>
              </div>

              <p className="text-gray-600 text-[16px] mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
