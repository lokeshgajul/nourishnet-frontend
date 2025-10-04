import React from "react";
import { Link } from "react-router-dom";

const FoodDonationCard = ({ donations = [] }) => {
  const filterDonations = donations.filter(
    (item) => item.donationStatus === "Pending"
  );

  if (!filterDonations.length) {
    return <p className="text-gray-500">No donations available.</p>;
  }

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 ">
      {donations?.slice(0, 3).map((item, id) => (
        <div
          key={id}
          className="bg-white rounded-md shadow-md hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden "
        >
          {/* Image */}
          <div className="w-full h-48 bg-gray-100 overflow-hidden">
            <img
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              src={item.foodImage}
              alt={item.foodTitle || "food"}
            />
          </div>

          {/* Content */}
          <div className="flex flex-col flex-grow justify-between px-5 py-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {item.foodTitle}
              </h3>
              <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                {item.foodDescription.slice(0, 40)}...
              </p>

              <div className="mt-3">
                <span className="inline-block text-xs font-medium bg-green-100 text-green-700 border border-green-200 px-3 py-1 rounded-full">
                  {item.foodCategory}
                </span>
              </div>

              <p className="mt-3 text-sm text-gray-700">
                <span className="font-semibold">Donor:</span> {item.donorName}
              </p>
            </div>

            {/* Button */}
            <div className="mt-4">
              <Link to={`/donation/${btoa(item._id)}`}>
                <button className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors duration-300 cursor-pointer">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoodDonationCard;
