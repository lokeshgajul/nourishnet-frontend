import React, { useContext, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Register from "../auth/Register/Register";
import Login from "../auth/Login/Login";
import Home from "../components/Home/Home";
import { AuthContext } from "../context/AuthContext";

const Main = () => {
  const { isAuthenticated, verfiyCookie } = useContext(AuthContext);

  useEffect(() => {
    verfiyCookie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <Routes>
        {isAuthenticated ? (
          <Route path="/" element={<Home />} />
        ) : (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default Main;
