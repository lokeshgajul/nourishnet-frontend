import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const NavbarSkeleton = () => {
  return (
    <div>
      {" "}
      <div className="w-full bg-white shadow-sm px-6 md:px-12 py-4 flex items-center justify-between">
        {/* Logo / Brand */}
        <div>
          <Skeleton width={120} height={25} />
        </div>

        {/* Nav links */}
        <div className="hidden md:flex gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} width={70} height={20} />
          ))}
        </div>

        {/* Right side: Button + Avatar */}
        <div className="flex items-center gap-4">
          <Skeleton width={90} height={35} borderRadius={8} />
          <Skeleton circle width={35} height={35} />
        </div>
      </div>
    </div>
  );
};

export default NavbarSkeleton;
