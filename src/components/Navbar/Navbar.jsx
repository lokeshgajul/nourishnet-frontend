import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { MdMenu, MdClose } from "react-icons/md";

const Navbar = () => {
  const navigate = useNavigate();
  const { verfiyCookie, isAuthenticated } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const links = ["Donors", "Volunteers", "NGO's", "About", "Contact"];

  const AuthButton = () =>
    isAuthenticated ? (
      <span
        onClick={handleLogout}
        className="bg-green-600 p-2 rounded-md text-sm text-white cursor-pointer hover:bg-green-700"
      >
        LogOut
      </span>
    ) : (
      <span className="p-1.5 border rounded-md text-sm font-normal border-gray-300 cursor-pointer">
        Sign Up
      </span>
    );

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
      <div className="flex justify-between items-center py-4 md:py-6 px-4 border-gray-300">
        <h2 className="font-bold md:text-[22px]  capitalize italic">
          NourishNet
        </h2>

        <ul className="hidden md:flex gap-3">
          {links.map((link) => (
            <li key={link} className="cursor-pointer">
              {link}
            </li>
          ))}
        </ul>

        <div className="hidden md:flex">
          <AuthButton />
        </div>

        <div className="md:hidden">
          {menuOpen ? (
            <MdClose
              size={28}
              onClick={() => setMenuOpen(false)}
              className="cursor-pointer"
            />
          ) : (
            <MdMenu
              size={28}
              onClick={() => setMenuOpen(true)}
              className="cursor-pointer"
            />
          )}
        </div>
      </div>

      <div
        className={`md:hidden bg-white shadow-md border-t border-gray-200 transition-all duration-500 ease-in-out overflow-hidden ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col items-end gap-3 p-4  text-center">
          {links.map((link) => (
            <li key={link} className="cursor-pointer w-full">
              {link}
            </li>
          ))}
          <div className="w-full flex justify-center">
            <AuthButton />
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
