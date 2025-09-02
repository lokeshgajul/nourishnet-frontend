import React from "react";
import image from "../../assets/images/image.png";
import foodImage from "../../assets/images/food.png";
import { Link, useParams } from "react-router-dom";

function DonationDetails() {
  const { id } = useParams();
  const decodedId = atob(id);

  // console.log("id ", decodedId);

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
                <p class="font-medium">Vegetable</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Total Items</p>
                <p class="font-medium">2</p>
              </div>
            </div>

            <hr class="border-t border-gray-300" />

            <div>
              <p class="text-sm text-gray-500">Visual Reference</p>
              <div class="mt-2 w-full overflow-hidden rounded-md">
                <img
                  class="h-auto w-full object-cover"
                  src={foodImage}
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
                <p class="font-medium">Lokesh Gajul</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Donor Type</p>
                <p class="font-medium">Individual Donor</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Address</p>
                <p class="font-medium">Vikhroli, Mumbai</p>
              </div>
            </div>
          </div>

          <div class="rounded-xl border border-gray-300 p-6 shadow-lg">
            <h2 class="mb-4 text-xl font-bold">Actions</h2>
            <div class="flex flex-col gap-4">
              <div>
                <p class="text-sm text-gray-500">Contact Donor</p>
                <p class="font-medium">lokeshg@gmail.com</p>
                <p class="font-medium">+91 9321531486</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Pickup Details</p>
                <p class="cursor-pointer font-medium text-blue-600 hover:underline">
                  View on map
                </p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Accept Donation</p>
                <button class="mt-2 w-full rounded-md bg-green-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-green-600">
                  <Link to="/claim-food">Confirm Pickup</Link>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-1"></div>
      </div>
    </>
  );
}

export default DonationDetails;
