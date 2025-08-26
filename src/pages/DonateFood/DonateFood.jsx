import React, { useState } from "react";
import DonateImg from "../../assets/images/donate.png";
import { RiNumber1, RiNumber2 } from "react-icons/ri";
import RequestStep1 from "../../components/DonationRequest/RequestStep1";
import RequestStep2 from "../../components/DonationRequest/RequestStep2";

const DonateFood = () => {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };
  const handleBack = () => {
    setStep((prev) => prev - 1);
  };
  return (
    <div className="mt-20 ">
      <div className="w-full bg-neutral-100 py-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 px-6 lg:px-14 items-center">
          {/* Left Section - Text */}
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold capitalize text-gray-800 leading-snug">
              Give food, Share Joy.
            </h1>

            <p className="text-gray-600 mt-6 max-w-md">
              Donate surplus food effortlessly and make a direct impact on
              reducing waste and supporting communities in need. Your
              contribution brightens lives.
            </p>

            <div className="mt-8 flex items-start">
              <button
                className="bg-green-600 hover:bg-green-700 px-6 py-3 text-sm md:text-base font-medium text-white rounded-md transition duration-200"
                type="button"
              >
                Start your Donation
              </button>
            </div>
          </div>

          {/* Right Section - Image */}
          <div className="flex justify-center">
            <img
              src={DonateImg}
              alt="Donation"
              className="w-full max-w-md lg:max-w-lg rounded-md object-contain"
            />
          </div>
        </div>
      </div>

      {/* Food Doantion Form */}

      <div className="text-center mt-10">
        <div className="flex justify-center flex-col items-center mt-6 py-4">
          <div className="max-sm:w-auto sm:w-[400px] md:w-[500px] lg:w-[600px]">
            <h1 className="text-2xl font-bold capitalize text-gray-800">
              Food Doantion Form
            </h1>
            <p className="py-2">Fill out the details to donate your surplus </p>
          </div>
          <div className="flex justify-evenly items-center mt-5 w-full max-w-md mx-auto">
            <span
              className={`text-center ${
                step == 1 ? "bg-green-500" : "bg-gray-400"
              } p-2 rounded-full`}
              onClick={step == 2 ? handleBack : undefined}
            >
              <RiNumber1 color="white" />
            </span>

            <div className="flex-1 h-[2px] bg-gray-400 mx-7"></div>

            <span
              className={`text-center ${
                step == 2 ? "bg-green-500" : "bg-gray-400"
              } p-2 rounded-full`}
            >
              <RiNumber2 color="white" />
            </span>
          </div>

          <div className="mt-4 flex justify-center items-center max-sm:w-auto sm:w-[400px] md:w-[500px] lg:w-[600px]">
            {step == 1 && <RequestStep1 onNext={handleNext} />}
            {step == 2 && <RequestStep2 onBack={handleBack} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonateFood;
