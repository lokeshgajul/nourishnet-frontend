import React from "react";
import image from "../../assets/images/image.png";
import foodImage from "../../assets/images/food.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { DontationContext } from "../../context/FoodDonationContext";
import { useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

function DonationDetails() {
  const { id } = useParams();
  const decodedId = atob(id);
  const {
    getDonationsDetails,
    setDeleted,
    donationDetails,
    setDonationDetails,
  } = useContext(DontationContext);
  const [currentUser, setCurrentUser] = useState();
  const [checkRole, setCheckRole] = useState();
  const navigate = useNavigate();

  const handleDonationDetails = async () => {
    try {
      const data = await getDonationsDetails(decodedId);
      if (data) {
        setDonationDetails(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckRole = async () => {
    try {
      const res = await axios.get(
        "https://nourishnet-backend.vercel.app/user_role",
        {
          withCredentials: true,
        }
      );
      const { role, user } = res.data;
      setCheckRole(role);
      setCurrentUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.post(
        "https://nourishnet-backend.vercel.app/donation/delete",
        { id: decodedId }
      );

      const data = response.data;
      if (data) {
        console.log(`deleted successfully ${decodedId}`);
        setDeleted(true);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDeleted(false);
    }
  };

  useEffect(() => {
    handleCheckRole();
    handleDonationDetails();
  }, [decodedId]);

  return (
    <>
      <section className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-center flex-row pt-24 md:pt-28 md:pb-12 max-[1000px]:flex-col max-lg:items-center">
        <div className="flex-1 flex justify-center flex-col max-lg:items-center px-4 lg:px-8">
          <h1 className="text-2xl lg:text-4xl font-semibold text-gray-800">
            Donation Details
          </h1>
          <p className="mt-4 text-gray-600 text-sm lg:text-base leading-relaxed">
            Review detailed information about this donation to ensure
            transparency and efficient distribution to those in need.
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-6">
            <Link to="/">
              <button
                type="button"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-sm font-medium rounded-full transition-all"
              >
                Back To Donations
              </button>
            </Link>
            <button
              type="button"
              className="border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 rounded-full hover:bg-gray-100 transition-all"
            >
              Volunteer Today
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full lg:w-[480px] max-md:mt-8">
          <img
            src={image}
            alt="Donation Illustration"
            className="rounded-xl object-contain w-full h-auto"
          />
        </div>
      </section>

      <div className="px-6 md:px-10 mt-12 mb-6">
        <h2 className="text-center text-2xl font-semibold text-gray-900">
          Donation Overview & Details
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-9 gap-6 px-6 md:px-10 pb-16">
        <div className="lg:col-span-1"></div>

        <div className="lg:col-span-4 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Donation Summary
          </h3>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">Request Raised</p>
                <p className="font-medium text-gray-800">
                  {donationDetails?.createdAt
                    ? new Date(donationDetails.createdAt).toLocaleString(
                        undefined,
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )
                    : "Not Mentioned"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Donation Status</p>
                <p
                  className={`font-medium ${
                    donationDetails?.donationStatus === "Claimed"
                      ? "text-green-600"
                      : donationDetails?.donationStatus === "Pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {donationDetails?.donationStatus || "Pending"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">Food Category</p>
                <p className="font-medium text-gray-800">
                  {donationDetails?.foodCategory || "Not Specified"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Items</p>
                <p className="font-medium text-gray-800">
                  {donationDetails?.foodQuantity || "N/A"}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500">Food Description</p>
              <p className="font-medium text-gray-800 mt-1 leading-relaxed">
                {donationDetails?.foodDescription ||
                  "No description provided for this donation."}
              </p>
            </div>

            <hr className="border-gray-300" />

            <div>
              <p className="text-sm text-gray-500 mb-2">Visual Reference</p>
              <div className="w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                <img
                  src={donationDetails?.foodImage || foodImage}
                  alt="Food donation"
                  className="w-full h-72 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Donor Info & Actions */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Donor Information
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium text-gray-800">
                  {donationDetails?.donorName || "Not Available"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Donor Type</p>
                <p className="font-medium text-gray-800">Individual Donor</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium text-gray-800">
                  {donationDetails?.donorAddress || "Not Mentioned"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Actions
            </h3>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Contact Donor</p>
                <p className="font-medium text-gray-800">lokeshg@gmail.com</p>
                <p className="font-medium text-gray-800">
                  +91 {donationDetails?.donorPhone || "N/A"}
                </p>
              </div>

              {checkRole === "Donor" ? (
                donationDetails?.donorId === currentUser?.id && (
                  <div>
                    <p className="text-sm text-gray-500 mt-2">
                      Manage Donation
                    </p>
                    <button
                      onClick={handleDelete}
                      className="mt-2 w-full rounded-md bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600 transition-all"
                    >
                      Delete Donation
                    </button>
                  </div>
                )
              ) : (
                <div>
                  <p className="text-sm text-gray-500 mt-2">Accept Donation</p>
                  <Link to={`/claim-food/${btoa(decodedId)}`}>
                    <button className="mt-2 w-full rounded-md bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700 transition-all">
                      Confirm Pickup
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1"></div>
      </div>
    </>
  );
}

export default DonationDetails;
