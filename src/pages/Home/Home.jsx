import React, { useEffect } from "react";
import homeImage from "../../assets/images/homeImage.png";
import { ToastContainer } from "react-toastify";
import { BiLeaf } from "react-icons/bi";
import DonorFoodCard from "../../components/FoodCard/FoodCard";
import { Link } from "react-router-dom";

const Home = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div>
      <div className="flex justify-center flex-row py-14 md:py-28 max-[1000px]:flex-col max-lg:items-center">
        <div className="col-span-3">
          <div className="flex justify-center max-lg:items-center flex-col px-7 pt-3 lg:px-14 lg:w-[600px]">
            <h1 className="max-lg:text-xl lg:text-3xl font-medium lg:pt-9">
              Nourish Communities, Not Landfills.{" "}
            </h1>

            <p className="pt-4 lg:text-lg text-sm">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur
              nemo sit illo inventore nobis est similique magni voluptate
              distinctio deleniti facilis id quasi nihil quis, sequi cupiditate.
              Provident, commodi minus.
            </p>

            <div className="py-4 lg:py-7 space-x-8">
              <Link to="/donate-food">
                <button
                  className="bg-green-600 px-5 py-3 text-sm font-medium text-white rounded-full cursor-pointer"
                  type="button"
                >
                  Donate Now
                </button>
              </Link>
              <button
                className=" border-slate-200 px-5 py-3 max-sm:mt-3 text-sm font-medium border text-black rounded-full cursor-pointer"
                type="button"
              >
                Volunteer Today
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <div className="px-6 lg:px-14">
            <img src={homeImage} alt="image" />
          </div>
        </div>
      </div>

      <div className="bg-neutral-100 pt-3 py-16 pb-16">
        <div className="md:text-center md:py-10 px-8 py-4 max-md:py-6">
          <span className="max-lg:text-xl lg:text-3xl font-medium">
            How NoriushNet Works
          </span>
        </div>

        <div className="flex flex-wrap justify-center items-stretch gap-6 max-md:px-8 md:px-20">
          {[1, 2, 3].map((item, id) => {
            return (
              <div
                key={id}
                className="w-full sm:w-[45%] lg:w-[31.5%] bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 text-green-600 p-3 rounded-full text-2xl">
                    <BiLeaf />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Combat Waste
                  </h2>
                </div>
                <p className="text-gray-600 text-sm mt-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nulla, mollitia. Lorem ipsum dolor sit, amet consectetur
                  adipisicing elit. Doloribus, dolorum. Lorem ipsum dolor sit
                  amet.
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <div className="md:text-center md:py-10 px-8 max-md:pt-4 pb-4">
          <span className="max-lg:text-xl lg:text-3xl font-medium leading-normal">
            Recent Food Donations
          </span>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6 pb-5 md:px-20">
          <DonorFoodCard />
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Home;
