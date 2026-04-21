import React, { useContext, useEffect } from "react";
import homeImage from "../../assets/images/donation2.jpg";
import { ToastContainer } from "react-toastify";
import { BiLeaf } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { DontationContext } from "../../context/FoodDonationContext";
import { Suspense, lazy } from "react";
import ActiveDonations from "../ActiveDoantions/ActiveDonations";
import RecentDonations from "../RecentDonations/RecentDonations";
import CardSkeleton from "../../components/LoadingSkeleton/Card";
import { FaHandsHelping } from "react-icons/fa";
import { BsGlobe2 } from "react-icons/bs";
import Chatbot from "../../components/Chatbot/Chatbot";
import RulesAndPolicy from "../../components/RulesAndPolicy/Policies";
import { useState } from "react";

const FoodDonationCard = lazy(
  () => import("../../components/FoodCard/FoodCard"),
);
const Home = () => {
  const { donorData, getDonorDetails, getDonorStatus } =
    useContext(DontationContext);
  const [showPolicy, setShowPolicy] = useState(false);

  useEffect(() => {
    getDonorStatus();
  }, []);

  useEffect(() => {
    const accepted = localStorage.getItem("policyAccepted");

    if (!accepted) {
      setShowPolicy(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("policyAccepted", "true");
    setShowPolicy(false);
  };

  // 🔥 THIS RETURN IS CRITICAL

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
    <div className="bg-[#d1fae5] min-h-screen">
      {showPolicy && <RulesAndPolicy onAccept={handleAccept} />}
      {/* Hero Section with Vibrant Background */}

      <div>
        <div className="relative overflow-hidden bg-white/40 backdrop-blur-3xl border-b border-emerald-200/50">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -mr-32 -mt-32 opacity-70" />
          <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-center flex-row pt-32 md:pt-40 pb-20 max-[1000px]:flex-col max-lg:items-center relative z-10 animate-fade-in-up">
            <div className="flex-1 flex justify-center flex-col max-lg:items-center px-4 lg:px-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                <BiLeaf /> Rescue • Nourish • Sustain
              </div>
              <h1 className="max-lg:text-4xl text-emerald-900 lg:text-6xl font-black lg:pt-2 text-center lg:text-left tracking-tight">
                Feed Hope,{" "}
                <span className="text-primary italic">Fight Waste.</span>
              </h1>

              <p className="pt-6 lg:text-xl text-lg text-center lg:text-left text-emerald-800/70 font-medium max-w-xl">
                Welcome to NourishNet. Join our global mission to rescue surplus
                food, nourish communities, and make a tangible difference in the
                world.
              </p>

              <div className="py-8 lg:py-10 flex flex-wrap justify-center lg:justify-start gap-4">
                <Link to="/donate-food">
                  <button
                    className="bg-primary px-8 py-4 text-sm font-black text-white rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary-dark hover:scale-[1.05] transition-all uppercase tracking-widest"
                    type="button"
                  >
                    Donate Now
                  </button>
                </Link>
                <button
                  className="bg-white border-2 border-emerald-100 px-8 py-4 text-sm font-black text-emerald-900 rounded-2xl hover:bg-emerald-50 transition-all uppercase tracking-widest shadow-lg shadow-emerald-900/5"
                  type="button"
                >
                  Volunteer Today
                </button>
              </div>
            </div>

            <div className="flex-1 flex justify-center px-4 lg:px-8 relative">
              <div className="absolute inset-0 bg-primary/10 blur-[120px] rounded-full scale-75 animate-pulse" />
              <img
                src={homeImage}
                alt="Helping Hands - NourishNet"
                className="w-full max-w-md object-contain rounded-[40px] shadow-2xl relative z-20 border-8 border-white"
              />
            </div>
          </div>
        </div>

        {/* How it Works Section */}
        <div className="py-24 bg-emerald-900">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-white text-3xl lg:text-5xl font-black tracking-tight mb-4">
                How NourishNet Works
              </h2>
              <p className="text-emerald-200/60 font-medium uppercase tracking-[0.3em] text-[10px]">
                Strategic Impact Framework
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {howItWorks.map((item, id) => (
                <div
                  key={id}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-8 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="bg-primary/20 text-primary p-4 rounded-2xl text-3xl w-fit mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all">
                    <item.icon />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4">
                    {item.title}
                  </h3>
                  <p className="text-emerald-100/70 text-sm leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Active Food Donations */}
        <div className="relative py-24 bg-white">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-50 rounded-full blur-[150px] -z-10" />
          <div className="max-w-7xl mx-auto px-6 lg:px-16">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-primary font-black uppercase text-xs tracking-widest mb-2">
                  Live Network
                </p>
                <h2 className="text-3xl lg:text-5xl font-black text-emerald-900 tracking-tight">
                  Active Food Donations
                </h2>
              </div>
              <div className="hidden lg:block h-px flex-1 bg-emerald-100 mx-10 mb-4 opacity-50" />
            </div>

            <Chatbot />

            <div className="py-6">
              <Suspense fallback={<CardSkeleton />}>
                <ActiveDonations donorData={donorData} />
              </Suspense>
            </div>
          </div>
        </div>

        {/* Recent Donations */}
        <div className="py-24 bg-emerald-50/50">
          <div className="max-w-7xl mx-auto px-6 lg:px-16">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-black text-emerald-900 tracking-tight mb-4">
                Recent Food Donations
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
            </div>

            <div className="flex flex-wrap gap-8 justify-center">
              <Suspense fallback={<CardSkeleton />}>
                <RecentDonations />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Home;
