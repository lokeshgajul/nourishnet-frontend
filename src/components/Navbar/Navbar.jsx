import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { MdMenu, MdClose } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { NgoContext } from "../../context/NgoContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { verfiyCookie, isAuthenticated, logout } = useContext(AuthContext);
  const { handleCheckRole, checkRole } = useContext(NgoContext);

  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Volunteers", path: "/volunteers" },
    { name: "NGO's", path: "/ngos" },
    { name: "About Us", path: "/about" },
    { name: "Feedback", path: "/feedback" },
  ];

  useEffect(() => {
    handleCheckRole();
  }, []);

  const handleProfile = () => {
    if (checkRole === "Ngo") {
      navigate("/ngo-profile");
    } else {
      navigate("/donor-profile");
    }
  };
  const handleLogout = async () => {
    const result = await logout();
    navigate("/");
    if (result === false) {
      await verfiyCookie();
    }
  };

  const AuthButton = () =>
    isAuthenticated ? (
      <>
        <span
          onClick={async () => {
            await handleLogout();
            navigate("/");
          }}
          className="bg-green-600 p-2 rounded-md text-sm text-white cursor-pointer hover:bg-green-700"
        >
          LogOut
        </span>
        <span
          onClick={() => handleProfile()}
          className="bg-neutral-100 rounded-full p-3 cursor-pointer"
        >
          <FaUser />
        </span>
      </>
    ) : (
      <span className="p-1.5 border rounded-md text-sm font-normal border-gray-300 cursor-pointer ">
        Sign Up
      </span>
    );

  return (
    <div className="fixed top-0 left-0 w-full z-50 shadow-md bg-white">
      <div className="flex justify-between items-center py-3 md:py-4 px-4 border-gray-300">
        <h2 className="font-bold md:text-[20px]  capitalize italic">
          NourishNet
        </h2>

        <ul className="hidden md:flex gap-3">
          {links.map((link, index) => (
            <li
              onClick={() => navigate(link.path)}
              key={index}
              className="cursor-pointer"
            >
              {link.name}
            </li>
          ))}
        </ul>

        <div className="hidden md:flex justify-center items-center space-x-3.5">
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
          {links.map((link, index) => (
            <li
              key={index}
              className="cursor-pointer w-full"
              onClick={() => navigate(link.path)}
            >
              {link.name}
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
