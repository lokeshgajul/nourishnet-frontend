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
      setTimeout(() => setFormError(""), 4000);
    };

    if (!role) return showTimedError("Please select a role to continue.");
    if (!fullName.trim() || !email.trim() || !phone.trim() || !address.trim() || !password.trim()) {
      return showTimedError("Please fill in all required fields.");
    }
    if (!isDonor && !bio.trim()) {
      return showTimedError("Please provide some details about your NGO.");
    }

    setLoading(true);
    try {
      await Register(role, fullName, email, phone, address, password, bio);
      role === "Ngo" ? navigate("/verification") : navigate("/login");
    } catch (error) {
      showTimedError(error.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center py-20 px-6 overflow-hidden bg-vibrant-gradient">
      {/* Decorative Blur */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-white/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-900/20 rounded-full blur-[120px]" />

      <div className="relative w-full max-w-[640px] animate-fade-in-up">
        {/* Card */}
        <div className="bg-white/95 backdrop-blur-2xl shadow-[0_32px_64px_-16px_rgba(6,78,59,0.3)] rounded-[48px] p-10 md:p-14 border border-white">
          
          <div className="mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight text-emerald-900 mb-2">Join NourishNet</h1>
            <p className="text-emerald-700/60 font-semibold uppercase text-[10px] tracking-[0.2em]">Network Registration</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-8">
            {/* Role Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-emerald-900 ml-1">Role</label>
              <Select
                className="!bg-emerald-50/50 !border-emerald-100 !rounded-2xl !px-6 !py-4 font-bold text-emerald-900 !shadow-none !outline-none focus-within:!border-primary focus-within:!ring-4 focus-within:!ring-primary/10 transition-all"
                options={options}
                labelField="name"
                valueField="id"
                placeholder="Select Donor or NGO"
                onChange={(value) => value.length > 0 && setRole(value[0].id)}
              />
            </div>

            {/* Grid 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-emerald-900 ml-1">{isDonor ? "Full Name" : "NGO Name"}</label>
                <input
                  type="text"
                  placeholder={isDonor ? "Full Name" : "NGO Name"}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-emerald-50/50 border border-emerald-100 rounded-2xl px-6 py-4 text-emerald-900 font-bold placeholder:text-emerald-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-emerald-900 ml-1">Email Address</label>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-emerald-50/50 border border-emerald-100 rounded-2xl px-6 py-4 text-emerald-900 font-bold placeholder:text-emerald-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                />
              </div>
            </div>

            {/* Grid 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-emerald-900 ml-1">Phone Number</label>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-emerald-50/50 border border-emerald-100 rounded-2xl px-6 py-4 text-emerald-900 font-bold placeholder:text-emerald-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-emerald-900 ml-1">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-emerald-50/50 border border-emerald-100 rounded-2xl px-6 py-4 text-emerald-900 font-bold placeholder:text-emerald-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-emerald-900 ml-1">Address</label>
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-emerald-50/50 border border-emerald-100 rounded-2xl px-6 py-4 text-emerald-900 font-bold placeholder:text-emerald-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
              />
            </div>

            {/* NGO Bio */}
            {!isDonor && role && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-4">
                <label className="text-xs font-bold text-emerald-900 ml-1">About your NGO</label>
                <textarea
                  rows="3"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about your organization..."
                  className="w-full bg-emerald-50/50 border border-emerald-100 rounded-2xl px-6 py-4 text-emerald-900 font-bold placeholder:text-emerald-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none resize-none"
                />
              </div>
            )}

            {formError && (
              <div className="bg-red-50 border border-red-100 p-4 rounded-2xl text-center">
                <p className="text-xs font-bold uppercase text-red-600 tracking-tight">{formError}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-primary text-white font-black py-6 rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary-dark hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 uppercase tracking-widest text-sm"
            >
              Create Account
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-sm font-medium text-emerald-800/60">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-black hover:underline decoration-2">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
