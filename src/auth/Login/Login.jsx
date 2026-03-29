import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorInfo, setErrorInfo] = useState({ show: false, message: "", status: null });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { Login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorInfo({ show: false, message: "", status: null });
    setLoading(true);

    try {
      await Login(email, password);
      navigate("/");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please try again.";
      const status = error.response?.data?.status || null;
      setErrorInfo({ show: true, message, status });
    } finally {
      setLoading(false);
    }
  };

  const closeErrorModal = () => setErrorInfo({ ...errorInfo, show: false });

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-vibrant-gradient">
      {/* Decorative Circles */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-900/20 rounded-full blur-[100px]" />

      <div className="relative w-full max-w-[440px] px-6 animate-fade-in-up">
        {/* Card */}
        <div className="bg-white/95 backdrop-blur-2xl shadow-[0_32px_64px_-16px_rgba(6,78,59,0.3)] rounded-[40px] p-10 md:p-12 border border-white">
          
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold tracking-tight text-emerald-900 mb-2">NourishNet</h1>
            <p className="text-emerald-700/60 font-semibold uppercase text-[10px] tracking-[0.2em]">Community Portal Access</p>
          </div>

          {/* Error Message */}
          {errorInfo.show && (
            <div className={`mb-6 p-4 rounded-2xl animate-in fade-in slide-in-from-top-2 flex items-center gap-3 ${
              errorInfo.status === "PENDING" ? "bg-amber-50 text-amber-700 border border-amber-100" : "bg-red-50 text-red-700 border border-red-100"
            }`}>
              <div className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center ${
                errorInfo.status === "PENDING" ? "bg-amber-500" : "bg-red-500"
              }`}>
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div className="flex-1 text-xs font-bold uppercase tracking-tight leading-tight">
                {errorInfo.message}
              </div>
              <button onClick={closeErrorModal}>
                <svg className="w-4 h-4 opacity-50 hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-emerald-900 ml-1">Email Address</label>
              <input
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full bg-emerald-50/50 border border-emerald-100 rounded-2xl px-6 py-4 text-emerald-900 font-bold placeholder:text-emerald-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-emerald-900 ml-1">Password</label>
              <input
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-emerald-50/50 border border-emerald-100 rounded-2xl px-6 py-4 text-emerald-900 font-bold placeholder:text-emerald-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white font-black py-5 rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 uppercase tracking-widest text-sm"
            >
              {loading ? "Authenticating..." : "Login"}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-sm font-medium text-emerald-800/60">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary font-black hover:underline decoration-2">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
