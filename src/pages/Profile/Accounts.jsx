import React from "react";

export default function AccountSettings() {
  return (
    <div className="rounded-lg">
      {/* Card Header */}
      <div className=" p-4">
        <h2 className="text-2xl font-bold text-green-700">Account Settings</h2>
      </div>

      {/* Card Content */}
      <div className="flex flex-col gap-4 p-4">
        <button className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded cursor-pointer">
          Edit Profile
        </button>

        <button className="border border-green-600 text-green-600 hover:bg-green-50 bg-transparent font-medium px-4 py-2 rounded cursor-pointer">
          Change Password
        </button>

        <button className="border border-red-600 text-red-600 hover:bg-red-50 bg-transparent font-medium px-4 py-2 rounded cursor-pointer">
          Delete Account
        </button>
      </div>
    </div>
  );
}
