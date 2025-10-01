import React, { useContext } from "react";
import { FiUploadCloud } from "react-icons/fi";
import Select from "react-dropdown-select";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { DontationContext } from "../../context/FoodDonationContext";

const DonationRequest = ({ onNext }) => {
  const {
    handleIncrement,
    handleDecrement,
    handleImageUpload,
    getDonorDetails,
    foodDonationForm,
    handleFoodDonation,
  } = useContext(DontationContext);

  const handleDonorDetails = async () => {
    await getDonorDetails();
    onNext();
  };

  const options = [
    {
      id: 1,
      name: "Cooked Meal",
    },
    {
      id: 2,
      name: "Packed Food",
    },
    {
      id: 3,
      name: "Fruits & Vegetables",
    },
    {
      id: 4,
      name: "Groceries",
    },
    {
      id: 5,
      name: "Others",
    },
  ];

  return (
    <div className="w-full max-[250px]:px-4">
      <span className="md:text-xl font-bold capitalize text-gray-800 flex text-left">
        Step 1: Item Details{" "}
      </span>
      <div className="flex flex-col mt-2">
        <label
          htmlFor="foodTitle"
          className="max-md:text-sm text-gray-700 font-medium text-left"
        >
          Food Title:
        </label>
        <input
          type="text"
          name="foodTitle"
          id="foodTitle"
          value={foodDonationForm.foodTitle}
          onChange={(e) => handleFoodDonation("foodTitle", e.target.value)}
          placeholder="Food Title..."
          className="mt-2 border border-gray-400 rounded-md p-2 focus:ring-2 focus:ring-green-500 outline-none"
          required
        />
      </div>

      <p className="mt-4 max-md:text-sm text-gray-700 font-medium text-left">
        Upload Food Image
      </p>
      <div className="flex justify-center items-center mt-2 rounded-md h-56 flex-col border-2 border-dashed border-gray-500 cursor-pointer p-3">
        {!foodDonationForm.preview ? (
          <div
            className="flex justify-center items-center flex-col h-full w-full"
            onClick={() => document.getElementById("image").click()}
          >
            <FiUploadCloud size={35} color="black" />
            <p className="text-gray-600 mt-2 text-center text-sm">
              Drag & drop an image here, or click to select
            </p>

            <input
              accept="image/*"
              type="file"
              name="foodImage"
              id="image"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
        ) : (
          <div
            className="w-full h-full flex flex-col justify-center items-center"
            onClick={() => document.getElementById("image-preview").click()}
          >
            <img
              src={foodDonationForm.preview}
              alt="Preview"
              className="max-h-40 w-auto object-cover rounded-md p-2"
            />
            <p className="mt-4 max-md:text-sm text-gray-700 font-medium text-left">
              Click image to change
            </p>
            <input
              id="image-preview"
              name="foodImage"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
        )}
      </div>

      <div className="flex flex-row justify-between gap-3 items-start mt-5 pb-5">
        {/* Food Category */}
        <div className="flex flex-col w-full max-w-xs">
          <label
            htmlFor="foodCategory"
            className=" max-md:text-sm text-gray-700 font-medium text-left"
          >
            Food Category:
          </label>
          <Select
            className="mt-2 text-sm"
            options={options}
            labelField="name"
            valueField="id"
            onChange={(value) => {
              handleFoodDonation("foodCategory", value[0].name);
            }}
          />
        </div>

        {/* Quantity */}
        <div className="flex flex-col w-full max-w-xs">
          <label
            htmlFor="quantity"
            className=" max-md:text-sm text-gray-700 font-medium text-left"
          >
            Quantity:
          </label>
          <div className="flex items-center border border-gray-400 mt-2">
            <button
              type="button"
              className="px-4 py-2 text-lg font-bold text-gray-700 hover:bg-gray-200 rounded-l-md"
              onClick={handleDecrement}
            >
              <FaMinus />
            </button>

            <span className="flex-1 text-center text-gray-800 font-semibold">
              {foodDonationForm.foodQuantity}
            </span>

            <button
              type="button"
              className="px-4 py-2 text-lg font-bold text-gray-700 hover:bg-gray-200 rounded-r-md"
              onClick={handleIncrement}
            >
              <FaPlus />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="Detail"
          className=" max-md:text-sm text-gray-700 font-medium text-left"
        >
          Detailed Description:{" "}
        </label>
        <textarea
          className="border border-gray-500 rounded-md mt-2 w-full h-32 p-2"
          name="foodDetail"
          value={foodDonationForm.foodDescription}
          onChange={(e) =>
            handleFoodDonation("foodDescription", e.target.value)
          }
          placeholder="e.g., Homemade lasagna, fresh ingredients, prepared this morning. Serves 4-6 people."
          id="foodDetail"
        />
        <div className="py-5">
          <button
            onClick={handleDonorDetails}
            className="bg-green-600 hover:bg-green-700 p-1.5 max-md:text-sm rounded-sm font-medium tracking-wide cursor-pointer text-white w-full transition duration-200"
            type="submit"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationRequest;
