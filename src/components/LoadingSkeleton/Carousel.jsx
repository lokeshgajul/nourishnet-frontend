import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CarouselSkeleton = () => {
  return (
    <div className="w-full h-[400px] md:h-[450px]">
      <Skeleton className="w-full h-full" />
    </div>
  );
};

export default CarouselSkeleton;
