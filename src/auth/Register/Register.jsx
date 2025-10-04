import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Select from "react-dropdown-select";

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState();
  const [formError, setFormError] = useState("");

  const navigate = useNavigate();
  const { Register, error, setLoading } = useContext(AuthContext);
  const isDonor = role === "Donor";

  const options = [
    { id: "Donor", name: "Donor" },
    { id: "Ngo", name: "NGO" },
  ];

  const handleRegister = async (e) => {
    e.preventDefault();
    setFormError("");

    const showTimedError = (message) => {
      setFormError(message);
      setTimeout(() => {
        setFormError("");
      }, 3000);
    };

    let missingFields = [];

    if (!role) {
      showTimedError("Please select a role to continue.");
      return;
    }

    if (!fullName.trim())
      missingFields.push(isDonor ? "Full Name" : "Organization Name");
    if (!email.trim()) missingFields.push("Email");
    if (!phone.trim()) missingFields.push("Phone Number");
    if (!address.trim()) missingFields.push("Address");
    if (!password.trim()) missingFields.push("Password");

    if (!isDonor && !bio.trim()) {
      missingFields.push("Bio");
    }

    if (missingFields.length > 0) {
      showTimedError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      await Register(role, fullName, email, phone, address, password, bio);
      navigate("/login");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!";

      showTimedError(message);
      console.log("Register API error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/final.jpg')" }}
    >
      <div className="bg-white/90 shadow-2xl p-8 rounded-3xl w-[23rem] border border-green-200 transition-all duration-300 hover:shadow-green-200">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-green-700 mb-2 font-[Poppins]">
            Create Account
          </h2>
          <p className="text-green-500 text-sm">Register as a Donor or NGO</p>
        </div>

        {
          <div className="mb-4 text-red-600 text-sm font-medium">
            {formError}
          </div>
        }
        <form className="space-y-4" onSubmit={handleRegister}>
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">
              Select Role
            </label>
            <Select
              className="mt-2 text-sm"
              options={options}
              labelField="name"
              valueField="id"
              values={options.filter((option) => option.id === role)}
              onChange={(value) => {
                if (value && value.length > 0) {
                  setRole(value[0].id);
                  console.log(value[0].id);
                }
              }}
            />
          </div>

          {isDonor ? (
            <>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />

              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="tel"
                className="w-full px-4 py-2 border border-gray-300 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />

              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />

              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </>
          ) : (
            <>
              {/* NGO Name */}
              <div className="mb-4">
                <label className="block mb-1 text-sm font-semibold text-gray-700">
                  NGO Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Organization Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 text-sm font-semibold text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ngo@example.org"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 text-sm font-semibold text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 9876543210"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 text-sm font-semibold text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Head Office Address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 text-sm font-semibold text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 text-sm font-semibold text-gray-700">
                  Bio
                </label>
                <textarea
                  rows="3"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about your organization"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none transition-all"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            Register
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-green-600 hover:text-green-700 font-semibold transition-colors"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
