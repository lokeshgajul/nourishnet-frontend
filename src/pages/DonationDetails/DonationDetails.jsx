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
  const { getDonationsDetails, deleted, setDeleted } =
    useContext(DontationContext);
  const [currentUser, setCurrentUser] = useState();
  const [checkRole, setCheckRole] = useState();
  const [details, setDetails] = useState();
  const navigate = useNavigate();

  const handleDonationDetails = async () => {
    try {
      const data = await getDonationsDetails(decodedId);
      if (data) {
        setDetails(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckRole = async () => {
    try {
      const res = await axios.get("http://localhost:3000/check_role", {
        withCredentials: true,
      });
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
        "http://localhost:3000/donation/delete",
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
      <div className="flex justify-center flex-row pt-24 md:pt-28 max-[1000px]:flex-col max-lg:items-center bg-neutral-100">
        <div className="col-span-3">
          <div className="flex md:justify-center max-lg:items-center flex-col px-7 pt-3 lg:px-14 lg:w-[600px]">
            <h1 className="max-lg:text-xl lg:text-3xl font-medium lg:pt-9">
              Donation Details
            </h1>
            <h2>{decodedId}</h2>

            <p className="pt-4 lg:text-lg text-sm">
              Review comprehensive information for each donation, ensuring
              transparency and efficient resource allocation to those in need.
            </p>

            <div className="py-4 lg:py-7 space-x-8">
              <Link to="/">
                <button
                  className="bg-green-600 px-5 py-3 text-sm font-medium text-white rounded-full cursor-pointer"
                  type="button"
                >
                  Back To Donation
                </button>
              </Link>
              <button
                className=" border-slate-200 px-5 py-3 max-sm:mt-3 text-sm font-medium border text-black rounded-full cursor-pointer"
                type="button"
              >
                Volunteer Today
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <div className="px-6 lg:px-14">
            <img src={image} alt="image" />
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center pt-8 pb-4">
        <span className="text-center font-semibold text-gray-700 text-xl">
          Donation Overview & Details{" "}
        </span>
      </div>

      <div class="grid grid-cols-1 px-4 gap-6 md:grid-cols-1 md:px-8 lg:grid-cols-9 lg:px-10 lg:py-4">
        <div class="lg:col-span-1"></div>

        <div class="rounded-xl border border-gray-300 p-6 shadow-lg lg:col-span-4">
          <h2 class="mb-4 text-xl font-bold">Donation Summary</h2>
          <div class="flex flex-col gap-6">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-500">Request Raised</p>
                <p class="font-medium">October 26, 2024</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Donation Status</p>
                <p class="font-medium text-green-600">Pending</p>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-500">Food Category</p>
                <p class="font-medium">{details?.foodCategory}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Total Items</p>
                <p class="font-medium">{details?.foodQuantity}</p>
              </div>
            </div>

            <hr class="border-t border-gray-300" />

            <div>
              <p class="text-sm text-gray-500">Visual Reference</p>
              <div class="mt-2 w-full overflow-hidden rounded-md">
                <img
                  class="h-96 w-full object-conatin"
                  src={details?.foodImage || foodImage}
                  alt="Food donation"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-6 lg:col-span-3">
          <div class="rounded-xl border border-gray-300 p-6 shadow-lg">
            <h2 class="mb-4 text-xl font-bold">Donor Information</h2>
            <div class="flex flex-col gap-4">
              <div>
                <p class="text-sm text-gray-500">Name</p>
                <p class="font-medium">{details?.donorName}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Donor Type</p>
                <p class="font-medium">Individual Donor</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Address</p>
                <p class="font-medium">{details?.donorAddress}</p>
              </div>
            </div>
          </div>

          <div class="rounded-xl border border-gray-300 p-6 shadow-lg">
            <h2 class="mb-4 text-xl font-bold">Actions</h2>
            <div class="flex flex-col gap-4">
              <div>
                <p class="text-sm text-gray-500">Contact Donor</p>
                <p class="font-medium">lokeshg@gmail.com</p>
                <p class="font-medium">+91 {details?.donorPhone}</p>
              </div>

              {checkRole == "Donor" && details?.donorId == currentUser?.id ? (
                <div>
                  <p class="text-sm mt-2 text-gray-500">Accept Donation</p>
                  <button
                    onClick={handleDelete}
                    class="mt-2 w-full rounded-md bg-red-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-600"
                  >
                    Delete Donation
                  </button>
                </div>
              ) : (
                <div>
                  <p class="text-sm mt-2 text-gray-500">Accept Donation</p>
                  <button class="mt-2 w-full rounded-md bg-green-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-green-600">
                    <Link to={`/claim-food/${btoa(decodedId)}`}>
                      Confirm Pickup
                    </Link>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div class="lg:col-span-1"></div>
      </div>
    </>
  );
}

export default DonationDetails;
