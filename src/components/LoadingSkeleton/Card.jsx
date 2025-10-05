import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const Card = () => {
  return (
    <div>
      {" "}
      <div className=" rounded-xl space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold md:text-center">
          <Skeleton width={350} height={50} />
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((id) => (
            <div
              key={id}
              className="p-4 bg-white rounded-xl shadow-md flex flex-col gap-4 w-full"
            >
              {/* Image */}
              <Skeleton height={180} borderRadius={12} />

              {/* Title */}
              <Skeleton width={`70%`} height={22} />

              {/* Category */}
              <Skeleton width={`40%`} height={18} />

              {/* Donor Name */}
              <Skeleton width={`50%`} height={18} />

              {/* Button */}
              <div className="mt-4">
                <Skeleton width={120} height={40} borderRadius={8} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
