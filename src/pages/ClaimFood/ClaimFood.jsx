import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { DontationContext } from "../../context/FoodDonationContext";
import { useNavigate, useParams } from "react-router-dom";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

const RequestFood = () => {
  const [details, setDetails] = useState();
  const { getDonationsDetails, donationDetails } = useContext(DontationContext);
  const [teamSize, setTeamSize] = useState();
  const [time, setTime] = useState();
  const { id } = useParams();
  const decodedId = atob(id);
  const navigate = useNavigate();

  const getNgoDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/ngo/details/`, {
        withCredentials: true,
      });

      const data = response.data;
      console.log("details ", data);
      setDetails(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDonationDetails = async () => {
    try {
      await getDonationsDetails(decodedId);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleDonationDetails();
  }, [decodedId]);

  const handleFoodClaimRequest = async (e) => {
    e.preventDefault();
    try {
      let IsoTime = null;

      if (time) {
        const dateObj = new Date(time);
        IsoTime = dateObj.toISOString();
      }

      const payload = {
        ngoId: details._id,
        ngoName: details.ngoName,
        ngoContactNo: details.phone,
        ngoEmail: details.email,
        ngoAddress: details.address,
        foodTitle: donationDetails.foodTitle,
        foodImage: donationDetails.foodImage,
        foodDescription: donationDetails.foodDescription,
        foodPickUpTime: IsoTime,
        teamSize: teamSize,
        donationId: donationDetails._id,
        donorName: donationDetails.donorName,
        donorPhone: donationDetails.donorPhone,
        donorAddress: donationDetails.donorAddress,
        donationStatus: "Claimed",
      };
      const response = await axios.post(
        `http://localhost:3000/ngo/claim/`,
        payload,
        {
          withCredentials: true,
        },
      );

      const data = response.data;
      console.log("details ", data);
      navigate("/");
      setDetails(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNgoDetails();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="max-md:mt-16 mt-28 px-4">
      <h1 className="text-center font-semibold text-xl md:text-3xl">
        Claim Food Request
      </h1>
      <p className="text-center max-md:text-sm pt-3 text-gray-700 tracking-wide font-medium max-w-2xl mx-auto">
        Kindly provide the details to claim this food donation. Please ensure
        all required fields are accurately filled.
      </p>

      <div className="max-w-4xl mx-auto bg-white rounded-lg p-6 ">
        <h2 className="text-lg font-semibold mb-4">User Identification</h2>

        <form className="flex flex-wrap gap-4">
          <div className="w-full md:w-[48%]">
            <label
              htmlFor="ngoName"
              className="block mb-1 max-md:text-sm font-medium text-gray-700"
            >
              NGO Name
            </label>
            <input
              type="text"
              id="ngoName"
              name="ngoName"
              value={details?.ngoName}
              placeholder="Enter NGO Name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div className="w-full md:w-[48%]">
            <label
              htmlFor="contactNumber"
              className="block mb-1 max-md:text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={details?.phone}
              placeholder="eg. 987664323"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div className="w-full md:w-[48%]">
            <label
              htmlFor="email"
              className="block mb-1 max-md:text-sm font-medium text-gray-700"
            >
              Email Address (optional)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={details?.email}
              placeholder="Enter Email Address"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </form>
      </div>

      {/* Donation Details Section */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg p-6 ">
        <h2 className="text-lg font-semibold mb-4">Pickup Details </h2>
        <form className="flex flex-wrap gap-4">
          <div className="w-full md:w-[48%]">
            <label
              htmlFor="ngoName"
              className="block mb-1 max-md:text-sm font-medium text-gray-700"
            >
              Preferred Pickup Time
            </label>
            <Datetime
              value={time} // default value
              dateFormat={false} // hide date, show only time
              timeFormat="hh:mm A" // 12-hour format with AM/PM
              onChange={(val) => setTime(val)}
              inputProps={{
                id: "pickup",
                name: "pickup",
                placeholder: "Select a Time Slot",
                className:
                  "w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500",
              }}
            />
          </div>

          <div className="w-full md:w-[48%]">
            <label
              htmlFor="contactPerson"
              className="block mb-1 max-md:text-sm font-medium text-gray-700"
            >
              Donor Name
            </label>
            <input
              type="text"
              id="Donor"
              name="Donor"
              value={donationDetails?.donorName}
              placeholder="Donor"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div className="w-full md:w-[48%]">
            <label
              htmlFor="contactPerson"
              className="block mb-1 max-md:text-sm font-medium text-gray-700"
            >
              Donor Contact
            </label>
            <input
              type="text"
              id="contactPerson"
              name="contactPerson"
              value={donationDetails?.donorPhone}
              placeholder="Person Name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div className="w-full md:w-[48%]">
            <label
              htmlFor="contactNumber"
              className="block mb-1 max-md:text-sm font-medium text-gray-700"
            >
              Team Size
            </label>
            <input
              type="Number"
              id="teamsize"
              name="teamsize"
              value={teamSize}
              onChange={(e) => setTeamSize(e.target.value)}
              placeholder="e.g., 2"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div className="w-full mt-2">
            <h2 className="text-xl font-semibold">Confirmation </h2>
            <p className="py-2 max-md:text-[12px]  text-gray-800 font-medium">
              I confirm that I am authorized to claim this donation and take
              full responsibility for its collection and distribution.
            </p>
            <div className="w-full flex justify-center mt-2">
              <button
                type="submit"
                onClick={handleFoodClaimRequest}
                className="bg-green-600 w-full max-md:text-sm hover:bg-green-700 text-white font-medium px-6 py-2 rounded-md shadow-md transition-all"
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
