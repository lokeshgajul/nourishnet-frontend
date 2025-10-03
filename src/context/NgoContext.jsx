import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const NgoContext = createContext();

export const NgoProvider = ({ children }) => {
  const [ngoDetails, setNgoDetails] = useState();
  const [checkRole, setCheckRole] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [claimedRequests, setClaimedRequests] = useState([]);

  const getNgoDetails = async () => {
    try {
      const response = await axios.get("http://localhost:3000/ngo/details", {
        withCredentials: true,
      });

      const data = await response.data;
      setNgoDetails(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckRole = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user_role", {
        withCredentials: true,
      });
      const { role, user } = res.data;
      setCheckRole(role);
      setCurrentUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllClaimedReqeusts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/ngo/claimed-requests",
        {
          withCredentials: true,
        }
      );
      setClaimedRequests(res.data.allclaims);
    } catch (error) {
      console.error("Error fetching active donations", error);
    }
  };

  const value = {
    ngoDetails,
    checkRole,
    currentUser,
    claimedRequests,
    setClaimedRequests,
    handleCheckRole,
    getNgoDetails,
    getAllClaimedReqeusts,
  };

  return <NgoContext.Provider value={value}>{children}</NgoContext.Provider>;
};
