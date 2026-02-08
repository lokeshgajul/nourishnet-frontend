import React, { useContext, useEffect } from "react";
import { NgoContext } from "../../../context/NgoContext";
import DonationSummary from "./Summary";
import DonationHistory from "./History";
import { CiMail } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { CiCamera } from "react-icons/ci";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Profile = () => {
  const { ngoDetails, getNgoDetails, claimedRequests, getAllClaimedReqeusts } =
    useContext(NgoContext);
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
        },
      );

      if (data.success) {
        setPreview(data.profileImage);
        getNgoDetails();
      }
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  const profileImageToShow =
    preview ||
    ngoDetails?.profileImage ||
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/donor-profile-picture-MeIUI9bNiRfX0t5CqUTDhnzG3q3jxU.jpg";

  useEffect(() => {
    getNgoDetails();
  }, [preview]);

  useEffect(() => {
    getAllClaimedReqeusts();
  }, []);

  return (
    <div className="bg-gray-50 mt-16 py-6">
      <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* ---------------- NGO Profile ---------------- */}
          <div className=" bg-white shadow-sm hover:shadow-md border mb-8 border-green-200 rounded-xl transition duration-300 flex flex-col justify-between">
            <div className="flex flex-col items-center p-6">
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

              {/* NGO Details */}
              <h2 className="text-xl font-bold mb-1">{ngoDetails?.ngoName}</h2>

              <div className="flex flex-row items-center justify-center gap-1">
                <CiMail size={20} />
                <p className="text-gray-700 text-lg tracking-wide">
                  {ngoDetails?.email}
                </p>
              </div>

              <p className="text-gray-700 text-sm tracking-wider mt-2">
                {ngoDetails?.phone}
              </p>
              <p className="text-gray-600 text-sm text-center tracking-wider mt-1">
                {ngoDetails?.address}
              </p>

              <div className="px-4 mt-2 flex flex-col border-t-2 border-gray-400 pt-4 ">
                <span className="text-gray-700 font-medium">
                  About Our Ngo:
                </span>
                <span className="text-gray-600 font-normal text-[15px] mt-2">
                  {ngoDetails?.bio}
                </span>
              </div>
            </div>

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

          <div className="space-y-4 col-span-2">
            <div className="rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition duration-300">
              <DonationSummary claimedDonations={claimedRequests} />
            </div>

            <div className="rounded-xl p-4 transition duration-300">
              <DonationHistory
                ngoDetails={ngoDetails}
                claimedDonations={claimedRequests}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
