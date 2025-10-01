import React from "react";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-500",
  Claimed: "bg-green-100 text-green-600",
  Completed: "bg-blue-100 text-blue-600",
  Cancelled: "bg-red-100 text-red-600",
};

const History = ({ userDonation }) => {
  return (
    <div className="">
      <h2 className="text-2xl font-bold text-green-700 mb-6">
        Donation History
      </h2>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {userDonation.map((donation, index) => (
          <div
            key={index}
            className="bg-white shadow-md hover:shadow-lg hover:shadow-green-100 transition-shadow duration-200"
          >
            <img
              src={donation?.foodImage || "/placeholder.svg"}
              alt={donation?.foodTitle}
              width={400}
              height={200}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-green-600 mb-2">
                {donation?.foodTitle}
              </h3>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  donation?.donationStatus == "Pending"
                    ? "bg-yellow-100 text-yellow-500"
                    : "bg-green-100 text-green-600"
                } mb-2`}
              >
                {donation.foodCategory}
              </span>
              <p className="text-gray-600 mb-2">{donation.foodDescription}</p>
              <div
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  donation?.donationStatus == "Pending"
                    ? "bg-yellow-100 text-yellow-500"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {donation?.donationStatus}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
