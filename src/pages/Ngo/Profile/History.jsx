import React from "react";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-500",
  Claimed: "bg-green-100 text-green-600",
  Completed: "bg-blue-100 text-blue-600",
  Cancelled: "bg-red-100 text-red-600",
};

const History = ({ claimedDonations }) => {
  return (
    <div className="">
      <h2 className="text-2xl font-bold text-green-700 mb-6">
        Donation History
      </h2>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {claimedDonations.map((donation, index) => (
          <div
            key={index}
            className="bg-white shadow-md hover:shadow-lg rounded-xl transition duration-300 overflow-hidden"
          >
            {/* Food Image */}
            <img
              src={donation?.foodImage || "/placeholder.svg"}
              alt={donation?.foodTitle || "Food Donation"}
              className="w-full h-48 object-cover"
            />

            {/* Details */}
            <div className="p-5 gap-2">
              {/* Food Info */}
              <div className="flex items-center justify-between">
                <h3 className="text-sm capitalize font-semibold text-green-700">
                  {donation?.foodTitle || "Food Item"}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    donation?.donationStatus === "Pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {donation?.donationStatus}
                </span>
              </div>

              <p className="text-gray-600 text-[13px] mt-2">
                {donation?.foodDescription.slice(0, 60) ||
                  "No description provided"}
                ...
              </p>

              {/* Donor Info */}
              <div className="text-sm text-gray-700 py-2 space-y-1">
                <p>
                  <span className="font-normal">Donor:</span>{" "}
                  {donation?.donorName || "Anonymous"}
                </p>
                <p>
                  <span className="font-normal">Location:</span>{" "}
                  {donation?.donorAddress || "Not specified"}
                </p>
              </div>

              {/* Date Info */}
              <div className="text-sm text-gray-500">
                <p>
                  <span className="font-semibold">Claimed At:</span>{" "}
                  {donation?.claimedAt
                    ? new Date(donation.claimedAt).toLocaleDateString()
                    : "N/A"}
                </p>
                {donation?.expiryTime && (
                  <p>
                    <span className="font-semibold">Expiry:</span>{" "}
                    {new Date(donation.expiryTime).toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
