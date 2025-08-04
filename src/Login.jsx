import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/food.jpg')" }} // Ensure this image is in public folder
    >
      {/* Login card */}
      <div className="bg-white shadow-xl p-8 rounded-2xl w-80 transform hover:scale-[1.02] transition-transform duration-300">
        <div className="text-center mb-8">
          <div className="mb-4">
            <h1 className="text-4xl font-bold text-green-800 mb-2 font-[Poppins]">NourishNet</h1>
            <p className="text-green-500 text-sm">Food Donation & Distribution Platform</p>
          </div>
          <p className="text-green-500 text-sm">Enter your credentials to continue</p>
        </div>
        
        <form className="space-y-4">
          <div className="relative">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-6 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500">
              @
            </span>
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              className="w-full px-6 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500">
              🔐
            </span>
          </div>

          <button 
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            <span className="relative">Login</span>
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link 
              to="/register" 
              className="text-green-600 hover:text-green-700 font-medium transition-colors"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
