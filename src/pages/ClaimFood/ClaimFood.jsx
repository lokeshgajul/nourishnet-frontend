import React, { useEffect } from "react";

const RequestFood = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="mt-28 px-4">
      <h1 className="text-center font-semibold text-2xl md:text-3xl">
        Claim Food Request
      </h1>
      <p className="text-center pt-3 pb-6 text-gray-700 tracking-wide font-medium max-w-2xl mx-auto">
        Kindly provide the details to claim this food donation. Please ensure
        all required fields are accurately filled.
      </p>

      {/* Ngo Section */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg p-6 ">
        <h2 className="text-xl font-semibold mb-4">User Identification</h2>

        <form className="flex flex-wrap gap-6">
          <div className="w-full md:w-[48%]">
            <label
              htmlFor="ngoName"
              className="block mb-1 font-medium text-gray-700"
            >
              NGO Name
            </label>
            <input
              type="text"
              id="ngoName"
              name="ngoName"
              placeholder="Enter NGO Name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div className="w-full md:w-[48%]">
            <label
              htmlFor="contactPerson"
              className="block mb-1 font-medium text-gray-700"
            >
              Contact Person
            </label>
            <input
              type="text"
              id="contactPerson"
              name="contactPerson"
              placeholder="Person Name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div className="w-full md:w-[48%]">
            <label
              htmlFor="contactNumber"
              className="block mb-1 font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              placeholder="eg. 987664323"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div className="w-full md:w-[48%]">
            <label
              htmlFor="email"
              className="block mb-1 font-medium text-gray-700"
            >
              Email Address (optional)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email Address"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </form>
      </div>

      {/* Donation Details Section */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg p-6 ">
        <h2 className="text-xl font-semibold mb-4">Pickup Details </h2>
        <form className="flex flex-wrap gap-6">
          <div className="w-full md:w-[48%]">
            <label
              htmlFor="ngoName"
              className="block mb-1 font-medium text-gray-700"
            >
              Preferred Pickup Time
            </label>
            <input
              type="text"
              id="pickup"
              name="pickup"
              placeholder="Select a Time Slop"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div className="w-full md:w-[48%]">
            {/* <label
              htmlFor="contactPerson"
              className="block mb-1 font-medium text-gray-700"
            >
              Donor
            </label> */}
            <input
              type="text"
              id="Donor"
              name="Donor"
              placeholder="Donor"
              className="w-full border mt-7 border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div className="w-full md:w-[48%]">
            <label
              htmlFor="contactNumber"
              className="block mb-1 font-medium text-gray-700"
            >
              Team Size
            </label>
            <input
              type="tel"
              id="teamsize"
              name="teamsize"
              placeholder="e.g., 2"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div className="w-full mt-14">
            <h2 className="text-xl font-semibold">Confirmation </h2>
            <p className="py-2 text-sm text-gray-800 font-medium">
              I confirm that I am authorized to claim this donation and take
              full responsibility for its collection and distribution.
            </p>
            <div className="w-full flex justify-center mt-2">
              <button
                type="submit"
                className="bg-green-600 w-full hover:bg-green-700 text-white font-medium px-6 py-2 rounded-md shadow-md transition-all"
              >
                Claim Now
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestFood;
