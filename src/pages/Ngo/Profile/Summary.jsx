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

export default function DonationSummary({ claimedDonations = [] }) {
  const getPendingCount = () => {
    return claimedDonations.filter((item) => item.donationStatus === "Pending")
      .length;
  };

  const getClaimedCount = () => {
    return claimedDonations.filter((item) => item.donationStatus === "Claimed")
      .length;
  };
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-2">
      <StatCard title="Total Donations" value={claimedDonations?.length} />
      <StatCard title="Claimed Donations" value={getClaimedCount()} />
      <StatCard title="Cancelled/Expired" value="2" />
    </div>
  );
}
