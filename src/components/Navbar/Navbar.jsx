import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { verfiyCookie } = useContext(AuthContext);

  const logout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/logout",
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("status");
      console.log("Logout successful");
      const { status } = await res.data;
      return status;
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleLogout = async () => {
    const result = await logout();
    if (result === false) {
      await verfiyCookie();
      navigate("/");
    }
  };

  return (
    <div className="flex flex-row justify-between items-center gap-3 py-3.5 px-4 border border-b-[1px] border-gray-300">
      <div>
        <h2>NourishNet</h2>
      </div>
      <ul className="flex flex-row justify-center items-center gap-3">
        <li>Donors</li>
        <li>Volunteers</li>
        <li>NGO's</li>
        <li>About</li>
        <li>Contact</li>
      </ul>

      <div className="space-x-2.5">
        <span className="p-1.5 border-[1px] rounded-md text-sm font-normal border-gray-300 cursor-pointer ">
          Sign Up
        </span>
        <span
          onClick={handleLogout}
          className="bg-green-600 p-2 rounded-md text-sm text-white cursor-pointer hover:bg-green-600"
        >
          LogOut
        </span>
      </div>
    </div>
  );
};

export default Navbar;
