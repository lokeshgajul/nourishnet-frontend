import React, { useContext, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Register from "../auth/Register/Register";
import Login from "../auth/Login/Login";
import Home from "../pages/Home/Home";
import { AuthContext } from "../context/AuthContext";
import { Footer } from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import ClaimFoodRequest from "../pages/ClaimFood/ClaimFood";
import DonateFood from "../pages/DonateFood/DonateFood";
import DonationDetails from "../pages/DonationDetails/DonationDetails";

const Main = () => {
  const { isAuthenticated, verfiyCookie } = useContext(AuthContext);

  useEffect(() => {
    verfiyCookie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      {isAuthenticated && (
        <>
          <Navbar />
        </>
      )}
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Routes>
            {isAuthenticated ? (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/claim-food" element={<ClaimFoodRequest />} />
                <Route path="/donate-food" element={<DonateFood />} />
                <Route path="/donation/:id" element={<DonationDetails />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
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
    </Router>
  );
};

export default Main;
