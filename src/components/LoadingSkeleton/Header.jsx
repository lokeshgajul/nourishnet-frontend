import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Header = () => {
  return (
    <div>
      {" "}
      <div className="flex flex-col md:flex-row justify-center items-center gap-10">
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl font-bold">
            <Skeleton width={280} />
          </h2>
          <p className="text-gray-600">
            <Skeleton count={3} />
          </p>
          <div className="flex gap-4">
            <Skeleton width={120} height={40} borderRadius={8} />
            <Skeleton width={150} height={40} borderRadius={8} />
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <Skeleton width={400} height={250} borderRadius={12} />
        </div>
      </div>
    </div>
  );
};

export default Header;
