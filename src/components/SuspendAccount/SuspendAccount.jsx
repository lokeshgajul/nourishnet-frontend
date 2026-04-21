import React from "react";

const SuspendedAccount = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Account Suspended 🚫
        </h1>

        <p className="text-gray-700 mb-6">
          Your donor account has been temporarily suspended due to a violation
          of our platform policies.
        </p>

        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6 text-sm">
          You will not be able to access platform features until your account is
          reviewed.
        </div>

        <p className="text-gray-600 mb-6">
          If you believe this is a mistake or want to restore your account,
          please contact the NourishNet support team.
        </p>

        <div className="space-y-2">
          <p className="font-medium">📧 Email: support@nourishnet.com</p>
          <p className="font-medium">📞 Phone: +91 9876543210</p>
        </div>

        <button
          onClick={() => (window.location.href = "/")}
          className="mt-6 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default SuspendedAccount;
