import React, { useContext, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Register from "../auth/Register/Register";
import Login from "../auth/Login/Login";
import Home from "../pages/Home/Home";
import LandingPage from "../pages/LandingPage/LandingPage";
import { AuthContext } from "../context/AuthContext";
import { Footer } from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import ClaimFoodRequest from "../pages/ClaimFood/ClaimFood";
import DonateFood from "../pages/DonateFood/DonateFood";
import DonationDetails from "../pages/DonationDetails/DonationDetails";
import Ngo from "../pages/Ngo/Home/Home";
import Loader from "../components/LoadingSkeleton/Main";
import DonorProfile from "../pages/Profile/Profile";
import NgoProfile from "../pages/Ngo/Profile/Profile";
import AboutUs from "../pages/About/About";
import Feedback from "../pages/Feedback/Feedback";

const Main = () => {
  const { isAuthenticated, verfiyCookie, checkRole, loading } =
    useContext(AuthContext);

  useEffect(() => {
    verfiyCookie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      {loading ? (
        <Loader />
      ) : (
        <>
          {isAuthenticated && <Navbar />}
          <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
              <Routes>
                {isAuthenticated ? (
                  <>
                    <Route
                      path="/"
                      element={checkRole === "Donor" ? <Home /> : <Ngo />}
                    />
                    <Route
                      path="/claim-food/:id"
                      element={<ClaimFoodRequest />}
                    />
                    <Route path="/donate-food" element={<DonateFood />} />
                    <Route path="/donor-profile" element={<DonorProfile />} />
                    <Route path="/loading" element={<Loader />} />
                    <Route path="/donation/:id" element={<DonationDetails />} />
                    <Route path="/ngo-profile" element={<NgoProfile />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/feedback" element={<Feedback />} />
                  </>
                ) : (
                  <>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/feedback" element={<Feedback />} />
                  </>
                )}
              </Routes>
            </div>
            {isAuthenticated && (
              <div className=" bottom-0 w-full ">
                <Footer />
              </div>
            )}
          </div>
        </>
      )}
    </Router>
  );
};

export default Main;
