import React from "react";
import DonationSummary from "./Summary";
import DonationHistory from "./History";
import AccountSettings from "./Accounts";
import { useContext } from "react";
import { DontationContext } from "../../context/FoodDonationContext";
import { useEffect } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CiCamera } from "react-icons/ci";
import axios from "axios";

const Profile = () => {
  const {
    donorData,
    getDonorDetails,
    getUserDonations,
    userDonations,
    deleted,
  } = useContext(DontationContext);

  const { logout, verfiyCookie } = useContext(AuthContext);
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  const handleLogout = async () => {
    const result = await logout();
    navigate("/");
    if (result === false) {
      await verfiyCookie();
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Local preview
    setPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const { data } = await axios.post(
        "http://localhost:3000/upload-profile",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (data.success) {
        alert("Profile image updated successfully!");
        setPreview(data.profileImage);
        // Optionally refresh donorData
        getDonorDetails();
      } else {
        alert("Upload failed: " + data.message);
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed due to network/server error");
    }
  };

  const profileImageToShow =
    preview ||
    donorData?.profileImage ||
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/donor-profile-picture-MeIUI9bNiRfX0t5CqUTDhnzG3q3jxU.jpg";

  useEffect(() => {
    if (!donorData) {
      getDonorDetails();
    }
  }, [donorData, getDonorDetails, preview]);

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
                <div className="relative mb-6">
                  <div className="h-28 w-28 rounded-full overflow-hidden">
                    <img
                      src={profileImageToShow}
                      alt="NGO Profile Picture"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <label
                    htmlFor="profileImageUpload"
                    className="absolute -bottom-3 -right-2 bg-green-500 text-white rounded-full p-2 shadow-md cursor-pointer hover:bg-green-600 transition"
                  >
                    <CiCamera size={20} width={3} />
                    <input
                      type="file"
                      id="profileImageUpload"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>

                <h2 className="text-xl font-bold text-green-600 mb-1">
                  {donorData?.donorName}
                </h2>
                <p className="text-gray-700 text-sm">{donorData?.email}</p>
                <p className="text-gray-700 text-sm">{donorData?.phone}</p>
                <p className="text-gray-600 text-sm text-center mt-2">
                  {donorData?.address}
                </p>

                <div className="p-6 flex flex-col gap-3 ">
                  <button className="w-full py-2 rounded-sm transition border flex flex-row justify-center items-center gap-2 border-gray-300 hover:bg-gray-200 px-4 cursor-pointer">
                    <IoSettingsOutline size={20} />
                    <span>Edit Profile</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full py-2 rounded-lg cursor-pointer transition"
                  >
                    Logout
                  </button>
                </div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
