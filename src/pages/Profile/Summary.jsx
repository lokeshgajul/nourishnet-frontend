import React from "react";

function StatCard({ title, value }) {
  return (
    <div className="bg-white shadow-sm border-l-4 border-green-500 py-6 px-5 ">
      <header className="flex flex-row items-center justify-between pb-2">
        <h2 className="text-sm font-medium  space-x-3 text-gray-500">
          {title}
        </h2>
      </header>
      <div>
        <div className="text-2xl font-bold text-green-600 space-x-3">
          {value}
        </div>
      </div>
    </div>
  );
}

export default function DonationSummary({ userDonation }) {
  const getPendingCount = () => {
    return userDonation.filter((item) => item.donationStatus === "Pending")
      .length;
  };

  const getClaimedCount = () => {
    return userDonation.filter((item) => item.donationStatus === "Claimed")
      .length;
  };
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-2">
      <StatCard title="Total Donations" value={userDonation?.length} />
      <StatCard title="Pending Donations" value={getPendingCount()} />
      <StatCard title="Claimed Donations" value={getClaimedCount()} />
    </div>
  );
}
