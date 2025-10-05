import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import React from "react";
import Header from "./Header";
import NavbarSkeleton from "./Navbar";
import Card from "./Card";
import Carousel from "./Carousel";
const HeroSection = () => {
  return (
    <div>
      <div>
        <NavbarSkeleton />
      </div>
      <div className="px-6 md:px-16 lg:px-24 py-12 space-y-16">
        {/* Hero Section */}
        <div>
          <Carousel />
        </div>

        {/* Section with cards */}
        <div className=" rounded-xl py-4 space-y-10">
          <h2 className="text-2xl md:text-3xl font-bold text-center">
            <Skeleton width={250} height={30} />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-6 bg-white rounded-xl shadow-md flex flex-col gap-5"
              >
                <div className="flex items-center gap-3">
                  <Skeleton circle width={50} height={50} />
                  <Skeleton width={150} height={20} />
                </div>
                <Skeleton count={3} />
              </div>
            ))}
          </div>
        </div>

        <div>
          <Card />
        </div>
        <div>
          <Card />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
