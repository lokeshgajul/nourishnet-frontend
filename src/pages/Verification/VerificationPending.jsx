import React from "react";

const NgoVerificationPending = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-lg text-center">
        <div className="text-yellow-500 text-5xl mb-4">⏳</div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Verification Pending
        </h2>

        <p className="text-gray-600 mb-6">
          Your NGO registration request has been received successfully. Our team
          is currently verifying your details. Once the verification process is
          complete, access will be granted to you.
        </p>

        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-3 rounded-md text-sm">
          You will be able to login once your NGO account is approved.
        </div>

        <button
          onClick={() => (window.location.href = "/login")}
          className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default NgoVerificationPending;
