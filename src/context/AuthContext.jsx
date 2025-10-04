import axios from "axios";
import React, { createContext, useState } from "react";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [checkRole, setCheckRole] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cookies, removeCookie] = useCookies([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState();

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
        "https://nourishnet-backend.vercel.app/register_user",
        payload
      );
      const data = response.data;
      setUser(data);
      setLoading(false);
    } catch (error) {
      console.log("API error:", error);
      const message =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      setError(message);
      setLoading(false);
    }
  };

  const Login = async (email, password) => {
    console.log("Login attempt:", { email, password });
    try {
      setLoading(true);
      const response = await axios.post(
        "https://nourishnet-backend.vercel.app/login_user",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      const { user } = response.data;
      setUser(user);
      setCheckRole(user.role);
      setLoading(false);
      setIsAuthenticated(true);
      localStorage.setItem("status", JSON.stringify(true));
    } catch (error) {
      console.log("API error:", error);
      const message =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      setError(message);
      setLoading(false);
    }
  };

  const verfiyCookie = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://nourishnet-backend.vercel.app/verify-token",
        {},
        { withCredentials: true }
      );

      const { valid, user } = await response.data;
      if (response.data.valid) {
        toast(`Hello ${user.email}`, {
          position: "top-right",
        });
        setIsAuthenticated(valid);
        setCheckRole(user.role);
      } else {
        removeCookie("token");
      }
    } catch (error) {
      console.error(
        "Token verification failed:",
        error.response?.data || error.message
      );
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const res = await axios.post(
        "https://nourishnet-backend.vercel.app/logout",
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("status");
      const { status } = await res.data;
      setIsAuthenticated(false);
      console.log(status);

      return status;
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const value = {
    Register,
    Login,
    loading,
    user,
    verfiyCookie,
    isAuthenticated,
    setIsAuthenticated,
    logout,
    checkRole,
    error,
    setError,
    setLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
