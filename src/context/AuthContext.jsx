import axios from "axios";
import React, { createContext, useState } from "react";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cookies, removeCookie] = useCookies([]);
  const [role, setRole] = useState("Donor");

  const Register = async (
    role,
    fullName,
    email,
    phone,
    address,
    password,
    bio
  ) => {
    try {
      let payload = { role };

      if (role == "Donor") {
        payload = {
          ...payload,
          donorName: fullName,
          email,
          phone,
          address,
          password,
        };
      } else if (role == "Ngo") {
        payload = {
          ...payload,
          ngoName: fullName,
          email,
          phone,
          address,
          password,
          bio,
        };
      }

      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/register_user",
        payload
      );
      const data = response.data;
      setUser(data);
      setLoading(false);
    } catch (error) {
      console.log("API error:", error);
    }
  };

  const Login = async (email, password) => {
    console.log("Login attempt:", { role, email, password });
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/login_user",
        {
          role,
          email,
          password,
        },
        { withCredentials: true }
      );
      const { user } = response.data;
      setUser(user);
      setLoading(false);
      setIsAuthenticated(true);
      localStorage.setItem("status", JSON.stringify(true));
    } catch (error) {
      console.log("API error:", error);
    }
  };

  const verfiyCookie = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/verify-token",
        {},
        { withCredentials: true }
      );

      const { status, user } = response.data;
      setIsAuthenticated(status);
      console.log(isAuthenticated);

      if (status) {
        toast(`Hello ${user.email}`, {
          position: "top-right",
        });
      } else {
        removeCookie("token");
      }
    } catch (error) {
      console.error(
        "Token verification failed:",
        error.response?.data || error.message
      );
      setIsAuthenticated(false);
      removeCookie("token");
    }
  };

  const value = {
    Register,
    Login,
    loading,
    user,
    verfiyCookie,
    isAuthenticated,
    role,
    setRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
