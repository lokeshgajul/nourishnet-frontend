import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12  mt-14">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center mb-6 text-green-700">
        About NourishNet
      </h1>

      {/* Description */}
      <p className="text-gray-700 leading-relaxed text-lg mb-10 text-center">
        NourishNet is a platform built to bridge the gap between food donors and
        NGOs. Our mission is to reduce food wastage while ensuring that surplus
        food reaches those who need it the most. Donors can seamlessly share
        details of available food, and NGOs can claim donations in real time.
        Together, we’re working to create a sustainable cycle of giving,
        reducing hunger, and building a stronger community.
      </p>

      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
          <Phone className="mx-auto text-green-600 w-8 h-8 mb-3" />
          <h3 className="font-semibold">Phone</h3>
          <p className="text-gray-600">+91 98765 43210</p>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
          <Mail className="mx-auto text-green-600 w-8 h-8 mb-3" />
          <h3 className="font-semibold">Email</h3>
          <p className="text-gray-600">support@nourishnet.org</p>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
          <MapPin className="mx-auto text-green-600 w-8 h-8 mb-3" />
          <h3 className="font-semibold">Address</h3>
          <p className="text-gray-600">Mumbai, Maharashtra India</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
