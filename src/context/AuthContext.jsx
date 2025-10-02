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
    console.log("Login attempt:", { email, password });
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/login_user",
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
    }
  };

  const verfiyCookie = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/verify-token",
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
        "http://localhost:3000/logout",
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
