import React, { useState } from "react";
import food_donation from "../../assets/images/food_donation.jpg";
import Volunteer from "../../assets/images/community-volunteer.jpg";
import ngoDirector from "../../assets/images/ngo-director.jpg";
import restaurant from "../../assets/images//professional-restaurant.jpg";

import {
  Menu,
  X,
  Heart,
  Users,
  Shield,
  Clock,
  MapPin,
  Star,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "../../components/Footer/Footer";
function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-green-600">NourishNet</h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a
                  href="#home"
                  className="text-gray-900 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Home
                </a>
                <a
                  href="#how-it-works"
                  className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  How It Works
                </a>
                <a
                  href="#donate"
                  className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Donate Food
                </a>
                <a
                  href="#claim"
                  className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Claim Food
                </a>
                <a
                  href="#contact"
                  className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>

            {/* Desktop Auth buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/login">
                <button
                  variant="outline"
                  className="text-green-600 border-green-600 hover:bg-green-50 bg-transparent p-1.5 cursor-pointer rounded-md"
                >
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="bg-green-600 hover:bg-green-700 text-white p-1.5 cursor-pointer rounded-md">
                  Register
                </button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-700 hover:text-green-600 focus:outline-none focus:text-green-600"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                <a
                  href="#home"
                  className="text-gray-900 hover:text-green-600 block px-3 py-2 text-base font-medium"
                >
                  Home
                </a>
                <a
                  href="#how-it-works"
                  className="text-gray-700 hover:text-green-600 block px-3 py-2 text-base font-medium"
                >
                  How It Works
                </a>
                <a
                  href="#donate"
                  className="text-gray-700 hover:text-green-600 block px-3 py-2 text-base font-medium"
                >
                  Donate Food
                </a>
                <a
                  href="#claim"
                  className="text-gray-700 hover:text-green-600 block px-3 py-2 text-base font-medium"
                >
                  Claim Food
                </a>
                <a
                  href="#contact"
                  className="text-gray-700 hover:text-green-600 block px-3 py-2 text-base font-medium"
                >
                  Contact
                </a>
                <div className="flex flex-col space-y-2 pt-4">
                  <Link to="/login">
                    <button
                      variant="outline"
                      className="text-green-600 border-green-600 hover:bg-green-50 bg-transparent p-1.5 cursor-pointer rounded-md"
                    >
                      Login
                    </button>
                  </Link>
                  <Link to="/register">
                    <button className="bg-green-600 hover:bg-green-700">
                      Register
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="bg-gradient-to-br from-green-50 to-blue-50 py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 text-balance">
                Share Meals.{" "}
                <span className="text-green-600">Spread Smiles.</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 text-pretty">
                Connecting food donors with NGOs and people in need. Together,
                we can reduce food waste and fight hunger in our communities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3"
                >
                  Donate Food
                </button>
                <button
                  size="lg"
                  variant="outline"
                  className="text-green-600 border-green-600 hover:bg-green-50 text-lg px-8 py-3 bg-transparent"
                >
                  Claim Food
                </button>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src={food_donation}
                alt="Food donation illustration"
                className="rounded-xl shadow-lg max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple steps to make a meaningful impact in your community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 hover:shadow-lg transition-shadow">
              <div className="pt-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  1. Register & List Food
                </h3>
                <p className="text-gray-600">
                  Donors register on our platform and list their surplus food
                  with details about quantity, type, and pickup location.
                </p>
              </div>
            </div>

            <div className="text-center p-8 hover:shadow-lg transition-shadow">
              <div className="pt-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  2. Browse & Request
                </h3>
                <p className="text-gray-600">
                  NGOs and recipients browse available food donations and submit
                  requests based on their needs and location.
                </p>
              </div>
            </div>

            <div className="text-center p-8 hover:shadow-lg transition-shadow">
              <div className="pt-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  3. Safe & Quick Sharing
                </h3>
                <p className="text-gray-600">
                  Secure coordination of pickup and delivery ensures food
                  reaches those who need it most, creating lasting impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Platform Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built with security, efficiency, and community impact in mind
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 hover:shadow-lg transition-shadow">
              <div className="pt-6">
                <Shield className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Secure Authentication
                </h3>
                <p className="text-gray-600 text-sm">
                  Verified users and organizations ensure safe and trustworthy
                  food sharing.
                </p>
              </div>
            </div>

            <div className="p-6 hover:shadow-lg transition-shadow">
              <div className="pt-6">
                <Clock className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Real-time Requests
                </h3>
                <p className="text-gray-600 text-sm">
                  Instant notifications and updates keep donors and recipients
                  connected.
                </p>
              </div>
            </div>

            <div className="p-6 hover:shadow-lg transition-shadow">
              <div className="pt-6">
                <Heart className="h-12 w-12 text-red-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Track Donations
                </h3>
                <p className="text-gray-600 text-sm">
                  Monitor your impact with detailed analytics and donation
                  history.
                </p>
              </div>
            </div>

            <div className="p-6 hover:shadow-lg transition-shadow">
              <div className="pt-6">
                <Users className="h-12 w-12 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Community Support
                </h3>
                <p className="text-gray-600 text-sm">
                  Join a network of caring individuals making a difference
                  together.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics Section */}
      <section className="py-20 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Together, we're making a real difference in fighting hunger
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-6xl font-bold mb-2">500+</div>
              <div className="text-xl text-green-100">Meals Donated</div>
            </div>
            <div>
              <div className="text-4xl md:text-6xl font-bold mb-2">100+</div>
              <div className="text-xl text-green-100">NGOs Connected</div>
            </div>
            <div>
              <div className="text-4xl md:text-6xl font-bold mb-2">1,000+</div>
              <div className="text-xl text-green-100">Smiles Shared</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What People Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from our community of donors and recipients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 hover:shadow-lg transition-shadow">
              <div className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">
                  "NourishNet made it so easy to donate our restaurant's surplus
                  food. We've helped feed hundreds of families!"
                </p>
                <div className="flex items-center">
                  <img
                    src={restaurant}
                    alt="Sarah Johnson"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">
                      Sarah Johnson
                    </div>
                    <div className="text-sm text-gray-600">
                      Restaurant Owner
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 hover:shadow-lg transition-shadow">
              <div className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">
                  "As an NGO, this platform has been invaluable. We can now
                  access fresh food donations efficiently and serve more
                  people."
                </p>
                <div className="flex items-center">
                  <img
                    src={ngoDirector}
                    alt="Michael Chen"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">
                      Michael Chen
                    </div>
                    <div className="text-sm text-gray-600">NGO Director</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 hover:shadow-lg transition-shadow">
              <div className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">
                  "The platform is user-friendly and has helped us reduce food
                  waste while supporting our local community."
                </p>
                <div className="flex items-center">
                  <img
                    src={Volunteer}
                    alt="Emily Rodriguez"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">
                      Emily Rodriguez
                    </div>
                    <div className="text-sm text-gray-600">
                      Community Volunteer
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
            Be a part of the change. Start donating today.
          </h2>
          <p className="text-xl mb-8 text-green-100 max-w-2xl mx-auto text-pretty">
            Join thousands of donors and recipients who are making a difference
            in their communities. Every meal shared is a step towards ending
            hunger.
          </p>
          <button
            size="lg"
            className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-3"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Footer */}
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default LandingPage;
