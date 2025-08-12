import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { verfiyCookie, isAuthenticated } = useContext(AuthContext);

  const logout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/logout",
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("status");
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
    <div className="fixed top-0 left-0 w-full z-50 shadow-md bg-white">
      <div className=" flex flex-row justify-between items-center w-full gap-3 py-6 px-4 border border-b-[1px] border-gray-300">
        <div>
          <h2 className="font-semibold text-xl capitalize italic">
            NourishNet
          </h2>
        </div>
        <ul className="flex flex-row justify-center items-center gap-3">
          <li className="cursor-pointer space-x-1">Donors</li>
          <li className="cursor-pointer space-x-1">Volunteers</li>
          <li className="cursor-pointer space-x-1">NGO's</li>
          <li className="cursor-pointer space-x-1">About</li>
          <li className="cursor-pointer space-x-1">Contact</li>
        </ul>

        <div className="space-x-2.5">
          {isAuthenticated ? (
            <span
              onClick={handleLogout}
              className="bg-green-600 p-2 rounded-md text-sm text-white cursor-pointer hover:bg-green-600"
            >
              LogOut
            </span>
          ) : (
            <span className="p-1.5 border-[1px] rounded-md text-sm font-normal border-gray-300 cursor-pointer ">
              Sign Up
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
