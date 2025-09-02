import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { DontationContext } from "../../context/FoodDonationContext";

const FoodDonationCard = () => {
  const { donorData, loading } = useContext(DontationContext);
  const [data, setData] = useState([]);

  const getRecentDoantions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/donations/donor/${donorData._id}`
      );

      const data = response.data;
      console.log(data);
      setData(data.donor_donations);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (donorData._id) {
      getRecentDoantions();
    }
  }, []);

  if (loading) {
    return <p>Loading donor details...</p>;
  }

  return (
    <div className="flex flex-wrap justify-center items-center gap-10 pb-6 max-md:px-6 max-[200px]:px-2">
      {data?.map((item, id) => (
        <div
          key={id}
          className="flex flex-col w-full sm:w-[45%] lg:w-[45%] rounded-xl shadow hover:shadow-lg transition-all"
        >
          {/* Image */}
          <div className="w-full h-48 sm:h-56 lg:h-64 overflow-hidden rounded-t-xl">
            <img
              className="w-full h-full object-cover"
              src={item.foodImage}
              alt="food"
            />
          </div>

          {/* Content */}
          <div className="px-4 py-2 flex flex-col gap-2">
            <span className="text-lg font-semibold text-gray-800">
              {item.foodTitle}
            </span>
            <p className="text-gray-600 text-sm">{item.Description}</p>

            <div className="text-sm text-gray-700 mt-2">
              <span className="font-bold tracking-wide border-slate-200 border-[1px] px-4 py-2 rounded-full">
                {item.foodCategory}
              </span>
              <p className="mt-4">
                <span className="font-semibold ">Donor:</span> Green Acres Farm
              </p>
            </div>
          </div>

          <div className="flex justify-start items-center gap-4 px-4 pb-4">
            <Link to="/claim-food">
              <button className="bg-green-600 hover:bg-green-700 font-semibold text-white px-4 py-2 rounded-md text-md transition-all cursor-pointer">
                Claim
              </button>
            </Link>
            <Link to={`/donation/${btoa(item._id)}`}>
              <button className="border-slate-200 border-[1px] rounded-md font-medium py-2 px-4 text-green-600 hover:underline text-md cursor-pointer">
                View Details
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoodDonationCard;
