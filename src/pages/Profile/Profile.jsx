import React from "react";
import DonationSummary from "./Summary";
import DonationHistory from "./History";
import AccountSettings from "./Accounts";
import { useContext } from "react";
import { DontationContext } from "../../context/FoodDonationContext";
import { useEffect } from "react";

const Profile = () => {
  const {
    donorData,
    getDonorDetails,
    getUserDonations,
    userDonations,
    deleted,
  } = useContext(DontationContext);

  useEffect(() => {
    if (!donorData) {
      getDonorDetails();
    }
  }, [donorData, getDonorDetails]);

  useEffect(() => {
    if (donorData?._id) {
      getUserDonations();
    }
  }, [donorData, deleted]);

  return (
    <div className="bg-gray-50 min-h-screen mt-20">
      <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-md hover:shadow-lg border border-green-200 rounded-xl transition duration-300">
              <div className="flex flex-col items-center p-6">
                <h1 className="text-3xl font-bold text-green-700 mb-10 text-center">
                  Donor Profile
                </h1>
                <div className="h-28 w-28 rounded-full border-4 border-green-500 overflow-hidden mb-4">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/donor-profile-picture-MeIUI9bNiRfX0t5CqUTDhnzG3q3jxU.jpg"
                    alt="Donor Profile Picture"
                    className="h-full w-full object-cover"
                  />
                </div>

                <h2 className="text-xl font-bold text-green-600 mb-1">
                  {donorData?.donorName}
                </h2>
                <p className="text-gray-700 text-sm">{donorData?.email}</p>
                <p className="text-gray-700 text-sm">{donorData?.phone}</p>
                <p className="text-gray-600 text-sm text-center mt-2">
                  {donorData?.address}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <div className=" rounded-xl p-4 transition duration-300">
              <DonationSummary userDonation={userDonations} />
            </div>

            <div className="rounded-xl border-gray-200 p-4 transition duration-300">
              <DonationHistory
                donorData={donorData}
                userDonation={userDonations}
              />
            </div>

            <div className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition duration-300">
              <AccountSettings />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
