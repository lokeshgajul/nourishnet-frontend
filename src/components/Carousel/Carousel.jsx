import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ngoHome from "../../assets/images/ngoHome.jpeg";
import carousel1 from "../../assets/images/carousel1.jpg";
import carousel2 from "../../assets/images/carousel2.jpg";
import { Link } from "react-router-dom";

const heroSlides = [
  {
    image: ngoHome,
    title: "Feed Hope, Fight Waste.",
    subtitle: "Every meal donated brings hope to someone in need.",
  },
  {
    image: carousel1,
    title: "Nourish Communities, Not Landfills.",
    subtitle: "Join our volunteers and make a real difference today.",
  },
  {
    image: carousel2,
    title: "Turn Surplus Into Smiles.",
    subtitle: "Rescue food and help nourish those who need it most.",
  },
];

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="w-full relative">
      <Slider {...settings}>
        {heroSlides.map((slide, index) => (
          <div key={index} className="w-screen h-[600px] md:h-[600px] relative">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover brightness-50"
            />
          </div>
        ))}
      </Slider>

      {/* Fixed overlay text */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 pointer-events-none">
        <h1 className="text-white text-xl md:text-3xl lg:text-4xl font-bold mb-3">
          Feed Hope, Fight Waste.
        </h1>
        <p className="text-white text-sm md:text-lg max-w-2xl">
          Welcome to NourishNet! Join our mission to rescue surplus food,
          nourish communities, and make a real difference.
        </p>
        <div className="mt-5 flex gap-4 flex-wrap justify-center pointer-events-auto">
          <Link to="/donate-food">
            <button className="bg-green-600 px-5 py-2 text-sm md:text-base font-medium text-white rounded-full cursor-pointer">
              Donate Now
            </button>
          </Link>
          <button className="border border-white px-5 py-2 text-sm md:text-base font-medium text-white rounded-full cursor-pointer">
            Volunteer Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
