import React from "react";
import { useNavigate } from "react-router-dom";
import { MdBlock } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { MdPhone } from "react-icons/md";
import { MdArrowBack } from "react-icons/md";

const SuspendedAccount = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-red-100 overflow-hidden">
          {/* Red banner */}
          <div className="bg-gradient-to-r from-red-500 to-rose-500 px-8 py-10 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 p-4 rounded-2xl">
                <MdBlock className="text-white text-5xl" />
              </div>
            </div>
            <h1 className="text-white text-3xl font-black tracking-tight">
              Account Suspended
            </h1>
            <p className="text-red-100 mt-2 text-sm font-medium">
              Your access to NourishNet has been restricted
            </p>
          </div>

          {/* Body */}
          <div className="px-8 py-8">
            <div className="bg-red-50 border border-red-100 rounded-2xl p-5 mb-6">
              <p className="text-red-700 text-sm leading-relaxed font-medium text-center">
                Your donor account has been suspended due to a violation of our
                platform policies. You cannot access any platform features until
                your account is reviewed and reinstated.
              </p>
            </div>

            <p className="text-gray-500 text-sm text-center mb-6">
              If you believe this is a mistake, please reach out to our support
              team and we'll look into it right away.
            </p>

            {/* Contact */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                <div className="bg-red-100 p-2 rounded-lg">
                  <MdEmail className="text-red-500 text-lg" />
                </div>
                <div>
                  <p className="text-[11px] text-gray-400 uppercase font-bold tracking-wider">
                    Email Support
                  </p>
                  <p className="text-gray-700 text-sm font-semibold">
                    support@nourishnet.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                <div className="bg-red-100 p-2 rounded-lg">
                  <MdPhone className="text-red-500 text-lg" />
                </div>
                <div>
                  <p className="text-[11px] text-gray-400 uppercase font-bold tracking-wider">
                    Phone Support
                  </p>
                  <p className="text-gray-700 text-sm font-semibold">
                    +91 9321531486
                  </p>
                </div>
              </div>
            </div>

            {/* Action */}
            <button
              onClick={() => navigate("/")}
              className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-red-500 to-rose-500 text-white font-black py-4 rounded-2xl hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-red-200 uppercase tracking-widest text-sm"
            >
              <MdArrowBack className="text-lg" />
              Back to Home
            </button>
          </div>
        </div>

        <p className="text-center text-gray-400 text-xs mt-6">
          NourishNet &mdash; Rescue &bull; Nourish &bull; Sustain
        </p>
      </div>
    </div>
  );
};

export default SuspendedAccount;
