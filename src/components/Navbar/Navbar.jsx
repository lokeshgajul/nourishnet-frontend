import React from "react";

const Navbar = () => {
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
        <span className="bg-green-600 p-2 rounded-md text-sm text-white cursor-pointer hover:bg-green-600">
          Login
        </span>
      </div>
    </div>
  );
};

export default Navbar;
