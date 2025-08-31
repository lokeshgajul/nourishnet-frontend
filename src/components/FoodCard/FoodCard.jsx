import React from "react";
import foodImage from "../../assets/images/food.png";
import { Link } from "react-router-dom";

const FoodDonationCard = () => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-7 pb-6 max-md:px-8 max-[200px]:px-2">
      {" "}
      {[1, 2, 3, 4].map((item, id) => (
        <div
          key={id}
          className="flex flex-col w-full sm:w-[45%] lg:w-[23%] rounded-xl shadow hover:shadow-lg transition-all"
        >
          {/* Image */}
          <div className="w-full">
            <img
              className="w-full object-cover rounded-t-xl"
              src={foodImage}
              alt="food"
            />
          </div>

          {/* Content */}
          <div className="px-4 py-2 flex flex-col gap-2">
            <span className="text-lg font-semibold text-gray-800">
              Fresh Produce Mix
            </span>
            <p className="text-gray-600 text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
              soluta praesentium, vel hic officia
            </p>

            <div className="text-sm text-gray-700 mt-2">
              <span className="font-bold tracking-wide border-slate-200 border-[1px] px-4 py-2 rounded-full">
                {" "}
                Vegetables
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
            <button className="border-slate-200 border-[1px] rounded-md font-medium py-2 px-4 text-green-600 hover:underline text-md cursor-pointer">
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoodDonationCard;
