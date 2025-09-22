import React, { useContext, useEffect } from "react";
import homeImage from "../../assets/images/homeImage.png";
import { ToastContainer } from "react-toastify";
import { BiLeaf } from "react-icons/bi";
import { Link } from "react-router-dom";
import { DontationContext } from "../../context/FoodDonationContext";
import { Suspense, lazy } from "react";
import ActiveDonations from "../ActiveDoantions/ActiveDonations";
import RecentDonations from "../RecentDonations/RecentDonations";
import CardSkeleton from "../../components/LoadingSkeleton/Card";

const FoodDonationCard = lazy(() =>
  import("../../components/FoodCard/FoodCard")
);
const Home = () => {
  const { donorData, getDonorDetails, loading } = useContext(DontationContext);

  useEffect(() => {
    if (!donorData) {
      getDonorDetails();
    }
  }, [donorData, getDonorDetails]);

  if (loading) {
    return <p>Loading recent donations...</p>;
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-center flex-row pt-24 md:pt-28 max-[1000px]:flex-col max-lg:items-center">
        <div className="flex-1 flex justify-center flex-col max-lg:items-center px-4 lg:px-8">
          <h1 className="max-lg:text-xl lg:text-3xl font-medium lg:pt-9 text-center lg:text-left">
            Nourish Communities, Not Landfills.
          </h1>

          <p className="pt-4 lg:text-lg text-sm text-center lg:text-left text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur
            nemo sit illo inventore nobis est similique magni voluptate
            distinctio deleniti facilis id quasi nihil quis, sequi cupiditate.
            Provident, commodi minus.
          </p>

          <div className="py-4 lg:py-7 flex flex-wrap justify-center lg:justify-start gap-4">
            <Link to="/donate-food">
              <button
                className="bg-green-600 px-5 py-3 text-sm font-medium text-white rounded-full cursor-pointer"
                type="button"
              >
                Donate Now
              </button>
            </Link>
            <button
              className="border border-slate-200 px-5 py-3 text-sm font-medium text-black rounded-full cursor-pointer"
              type="button"
            >
              Volunteer Today
            </button>
          </div>
        </div>

        <div className="flex-1 flex justify-center px-4 lg:px-8">
          <img
            src={homeImage}
            alt="NourishNet Home"
            className="w-full max-w-md object-contain"
          />
        </div>
      </div>

      {/* How it Works Section */}
      <div className="bg-neutral-100 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="max-lg:text-xl lg:text-3xl font-medium mb-10">
            How NourishNet Works
          </h2>

          <div className="flex flex-wrap justify-center gap-6">
            {[1, 2, 3].map((item, id) => (
              <div
                key={id}
                className="w-full sm:w-[45%] lg:w-[31%] bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 text-green-600 p-3 rounded-full text-2xl">
                    <BiLeaf />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Combat Waste
                  </h3>
                </div>
                <p className="text-gray-600 text-sm mt-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nulla, mollitia. Lorem ipsum dolor sit, amet consectetur
                  adipisicing elit. Doloribus, dolorum. Lorem ipsum dolor sit
                  amet.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Food Donations */}
      <div className="pt-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <h2 className="text-center max-lg:text-xl lg:text-3xl font-medium leading-normal">
            Active Food Donation Requests
          </h2>

          <div className="py-4">
            <Suspense fallback={<CardSkeleton />}>
              <ActiveDonations donorData={donorData} />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Recent Donations */}
      <div className="">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <h2 className="text-center max-lg:text-xl lg:text-3xl font-medium leading-normal">
            Recent Food Donations
          </h2>

          <div className="flex flex-wrap gap-6 justify-center py-4">
            <Suspense fallback={<CardSkeleton />}>
              <RecentDonations />
            </Suspense>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Home;
