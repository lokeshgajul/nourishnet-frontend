import React from "react";

export const Footer = () => {
  return (
    <div className="border border-t-[1px] border-gray-300 pt-9 pb-3 bg-neutral-100">
      <ul className="flex max-md:text-[12px] flex-row justify-evenly items-center ">
        <li>Privacy Policy</li>
        <li>Terms Of Service</li>
        <li>Contact Us</li>
      </ul>

      <p className="text-center max-md:text-[14px] pt-4 pb-2">
        @2025 NourishNet All rights reserved
      </p>
    </div>
  );
};
