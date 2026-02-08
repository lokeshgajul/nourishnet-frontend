import React, { useContext, useEffect } from "react";
import homeImage from "../../assets/images/donation2.jpg";
import { ToastContainer } from "react-toastify";
import { BiLeaf } from "react-icons/bi";
import { Link } from "react-router-dom";
import { DontationContext } from "../../context/FoodDonationContext";
import { Suspense, lazy } from "react";
import ActiveDonations from "../ActiveDoantions/ActiveDonations";
import RecentDonations from "../RecentDonations/RecentDonations";
import CardSkeleton from "../../components/LoadingSkeleton/Card";
import { FaHandsHelping } from "react-icons/fa";
import { BsGlobe2 } from "react-icons/bs";
import Chatbot from "../../components/Chatbot/Chatbot";

const FoodDonationCard = lazy(
  () => import("../../components/FoodCard/FoodCard"),
);
const Home = () => {
  const { donorData, getDonorDetails } = useContext(DontationContext);

  const howItWorks = [
    {
      id: 1,
      title: "Combat Food Waste",
      description:
        "NourishNet bridges the gap between food donors and NGOs, enabling restaurants, hotels, and households to share surplus food safely and efficiently. Our smart matching system ensures that every meal reaches those who need it most—reducing waste and feeding communities.",
      icon: BiLeaf,
    },
    {
      id: 2,
      title: "Empower Communities",
      description:
        "We bridge the gap between generosity and need. NGOs can view, claim, and coordinate food pickups from verified donors in real time, ensuring fair distribution and transparent tracking of every donation made through the platform.",
      icon: FaHandsHelping,
    },
    {
      id: 3,
      title: "Promote Sustainability",
      description:
        "Every act of sharing contributes to reducing food waste, hunger, and environmental impact. NourishNet promotes a culture of sustainability where every meal saved helps build a more equitable and greener planet.",
      icon: BsGlobe2,
    },
  ];
  useEffect(() => {
    if (!donorData) {
      getDonorDetails();
    }
  }, [donorData, getDonorDetails]);

  return (
    <div>
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-center flex-row pt-24 md:pt-28 md:pb-12 max-[1000px]:flex-col max-lg:items-center">
        <div className="flex-1 flex justify-center flex-col max-lg:items-center px-4 lg:px-8">
          <h1 className="max-lg:text-xl text-green-700 lg:text-3xl font-semibold lg:pt-9 text-center lg:text-left">
            Feed Hope, Fight Waste.
          </h1>

          <p className="pt-4 lg:text-lg text-sm text-center lg:text-left text-gray-700">
            Welcome to NourishNet! Join our mission to rescue surplus food,
            nourish communities, and make a real difference. Every meal donated
            brings hope and reduces waste.
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
              className="border border-slate-200 px-5 py-3 bg-white text-sm font-medium text-black rounded-full cursor-pointer"
              type="button"
            >
              Volunteer Today
            </button>
          </div>
        </div>

        <div className="flex-1 flex justify-center px-4 lg:px-8 rounded-md">
          <img
            src={homeImage}
            alt="Helping Hands - NourishNet"
            className="w-full max-w-md object-contain rounded-md"
          />
        </div>
      </div>

      {/* How it Works Section */}
      <div className=" py-6">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="max-lg:text-xl lg:text-3xl font-medium mb-10">
            How NourishNet Works
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {howItWorks.map((item, id) => (
              <div
                key={id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 text-green-600 p-3 rounded-full text-2xl">
                    <item.icon />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm mt-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Food Donations */}
      <div className="pt-6">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <h2 className="text- max-lg:text-xl lg:text-2xl text-gray-800 font-medium leading-normal">
            Active Food Donations
          </h2>

          <div>
            <Chatbot />
          </div>
          <div className="py-6">
            <Suspense fallback={<CardSkeleton />}>
              <ActiveDonations donorData={donorData} />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Recent Donations */}
      <div className="py-2 md:py-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <h2 className=" max-lg:text-xl lg:text-2xl text-gray-800 font-semibold leading-normal">
            Recent Food Donations
          </h2>

          <div className="flex flex-wrap gap-6 justify-center py-6">
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
