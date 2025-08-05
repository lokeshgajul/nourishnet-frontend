import React from "react";
import homeImage from "../../assets/images/homeImage.png";

const Home = () => {
  return (
    <div>
      {/* Home Page Header Section */}

      <section className="flex flex-row justify-center px-6 py-12">
        <div className="flex justify-around items-center flex-col w-[600px] text-center md:text-left">
          <div className="mb-6"></div>
          <div>
            <h1 className="text-3xl font-medium ">
              Nourish Communities, Not Landfills{" "}
            </h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae
              eveniet, rem vitae soluta, eum, sapiente nesciunt voluptatibus
              quod quia illum nemo obcaecati quae perspiciatis consequatur odit
              vero. Suscipit, consequuntur incidunt?
            </p>
          </div>

          <div>
            <button>Donate Now</button>
            <button>Volunteet Today</button>
          </div>
        </div>
        <div>
          <div>
            <img src={homeImage} alt="img" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
