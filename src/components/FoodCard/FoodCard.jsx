import React from "react";
import { Link } from "react-router-dom";

const FoodDonationCard = ({ donations = [], donorData }) => {
  const filterDonations = donations.filter(
    (item) => item.donationStatus === "Pending"
  );

  if (!filterDonations.length) {
    return <p className="text-gray-500">No donations available.</p>;
  }

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10 max-[200px]:px-2">
      {donations.map((item, id) => (
        <div
          key={id}
          className="w-full bg-white rounded-xl shadow-md hover:shadow-lg transition-all"
        >
          {/* Image */}
          <div className="w-full aspect-video overflow-hidden rounded-md">
            <img
              className="w-full h-full rounded-md object-cover"
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

            <div className="text-sm text-gray-800">
              <span className="font-bold tracking-wide bg-green-100 border-slate-200 border-[1px] px-4 py-2 rounded-full">
                {item.foodCategory}
              </span>
              <p className="mt-4">
                <span className="font-semibold ">Donor:</span> {item.donorName}
              </p>
            </div>
          </div>

          <div className="flex justify-start items-center gap-4 px-4 pb-4 mt-1">
            {donorData?.role ? (
              <Link to={`/donation/${btoa(item._id)}`}>
                <button className="border-slate-200 border-[1px] rounded-md font-medium py-2 px-4 bg-green-600 text-white hover:underline text-md cursor-pointer">
                  View Details
                </button>
              </Link>
            ) : (
              <>
                <Link to={`/donation/${btoa(item._id)}`}>
                  <button className="border-slate-200 border-[1px] rounded-md font-medium py-2 px-4 bg-green-600 text-white hover:underline text-md cursor-pointer">
                    View Details
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoodDonationCard;
