import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ClaimedDonations = () => {
  const [data, setData] = useState();

  const getAllClaimedReqeusts = async () => {
    try {
      const res = await axios.get(
        "https://nourishnet-backend.vercel.app/ngo/claimed-requests",
        {
          withCredentials: true,
        }
      );
      setData(res.data.allclaims);
    } catch (error) {
      console.error("Error fetching active donations", error);
    }
  };

  useEffect(() => {
    getAllClaimedReqeusts();
  }, []);
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-6 max-[200px]:px-2">
      {data?.slice(0, 4).map((item, id) => (
        <div
          key={id}
          className="w-full px-6 gap-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6"
        >
          {/* Top Row: NGO + Status */}
          <div className="flex flex-row justify-between items-center border-b pb-3">
            <div>
              <span className="text-lg font-semibold text-gray-800">
                {item.ngoName}
              </span>
              <p className="text-gray-600 text-sm mt-1">{item.ngoEmail}</p>
            </div>
            <div className="text-sm text-gray-800">
              <span className="font-bold tracking-wide bg-green-100 border border-slate-200 px-4 py-1 rounded-full">
                {item.donationStatus}
              </span>
            </div>
          </div>

          {/* Donation Details */}
          <div className="flex flex-col gap-2 py-4 text-gray-700">
            <span className="font-medium">
              <span className="font-semibold text-gray-800">Donor:</span>{" "}
              {item.donorName}
            </span>
            <span className="text-sm text-gray-600">
              <span className="font-semibold text-gray-800">Contact:</span>{" "}
              {item.donorPhone}
            </span>
            <span>
              <span className="font-semibold text-gray-800">Pickup Time:</span>{" "}
              {new Date(item.foodPickUpTime).toLocaleString()}
            </span>
            <span>
              <span className="font-semibold text-gray-800">
                Pickup Location:
              </span>{" "}
              {item.donorAddress || "Not provided"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClaimedDonations;
