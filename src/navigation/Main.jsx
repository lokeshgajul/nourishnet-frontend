import React, { useContext, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Register from "../auth/Register/Register";
import Login from "../auth/Login/Login";
import Home from "../pages/Home/Home";
import { AuthContext } from "../context/AuthContext";
import { Footer } from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import RequestFood from "../pages/RequestFood/RequestFood";

const Main = () => {
  const { isAuthenticated, verfiyCookie } = useContext(AuthContext);

  useEffect(() => {
    verfiyCookie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/request-food" element={<RequestFood />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        )}
      </Routes>
      <Footer />
    </Router>
  );
};

export default Main;
