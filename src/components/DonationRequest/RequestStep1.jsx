import React, { useContext } from "react";
import { FiUploadCloud } from "react-icons/fi";
import Select from "react-dropdown-select";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { DontationContext } from "../../context/FoodDonationContext";

const DonationRequest = ({ onNext }) => {
  const {
    count,
    preview,
    handleIncrement,
    handleDecrement,
    handleImageUpload,
    setFoodCategory,
    setFoodTitle,
    foodTitle,
    getDonorDetails,
  } = useContext(DontationContext);

  const handleDonorDetails = async () => {
    await getDonorDetails();
    onNext();
  };

  const options = [
    {
      id: 1,
      name: "Leanne Graham",
    },
    {
      id: 2,
      name: "Ervin Howell",
    },
    {
      id: 3,
      name: "Ervin Howell",
    },
    {
      id: 4,
      name: "Ervin Howell",
    },
    {
      id: 5,
      name: "Ervin Howell",
    },
  ];

  return (
    <div className="w-full">
      <span className="text-xl font-bold capitalize text-gray-800 flex text-left">
        Step 1: Item Details{" "}
      </span>
      <div className="flex flex-col mt-2">
        <label
          htmlFor="foodTitle"
          className="text-gray-700 font-medium text-left"
        >
          Food Title:
        </label>
        <input
          type="text"
          name="foodTitle"
          id="foodTitle"
          value={foodTitle}
          onChange={(e) => setFoodTitle(e.target.value)}
          placeholder="Food Title..."
          className="mt-2 border border-gray-400 rounded-md p-2 focus:ring-2 focus:ring-green-500 outline-none"
          required
        />
      </div>

      <p className="mt-2 text-left text-gray-700 font-medium">
        Upload Food Image
      </p>
      <div className="flex justify-center items-center mt-3 rounded-md h-56 flex-col border-2 border-dashed border-gray-500 cursor-pointer p-3">
        {!preview ? (
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
              name="image"
              id="image"
              className="hidden"
              onChange={(e) => {
                handleImageUpload(e);
                e.target.value = "";
              }}
            />
          </div>
        ) : (
          <div
            className="w-full h-full flex flex-col justify-center items-center"
            onClick={() => document.getElementById("image-preview").click()}
          >
            <img
              src={preview}
              alt="Preview"
              className="max-h-40 w-auto object-cover rounded-md p-2"
            />
            <p className="text-gray-500 text-sm mt-2 text-center">
              Click image to change
            </p>
            <input
              id="image-preview"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                handleImageUpload(e);
                e.target.value = ""; // reset after selecting
              }}
            />
          </div>
        )}
      </div>

      <div className="flex flex-row justify-between gap-6 items-start mt-5 pb-5">
        {/* Food Category */}
        <div className="flex flex-col w-full max-w-xs">
          <label
            htmlFor="foodCategory"
            className="font-medium text-gray-700 text-left"
          >
            Food Category:
          </label>
          <Select
            className="mt-2"
            options={options}
            labelField="name"
            valueField="id"
            onChange={(value) => setFoodCategory(value)}
          />
        </div>

        {/* Quantity */}
        <div className="flex flex-col w-full max-w-xs">
          <label
            htmlFor="quantity"
            className="font-medium text-gray-700 text-left"
          >
            Quantity:
          </label>
          <div className="flex items-center border border-gray-400 mt-2">
            {/* Minus */}
            <button
              type="button"
              className="px-4 py-2 text-lg font-bold text-gray-700 hover:bg-gray-200 rounded-l-md"
              onClick={handleDecrement}
              disabled={count <= 1}
            >
              <FaMinus />
            </button>

            {/* Count */}
            <span className="flex-1 text-center text-gray-800 font-semibold">
              {count}
            </span>

            {/* Plus */}
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
        <label htmlFor="Detail" className="font-medium text-gray-700 text-left">
          Detailed Description:{" "}
        </label>
        <textarea
          className="border border-gray-500 rounded-md mt-2 w-full h-32 p-2"
          name="foodDetail"
          placeholder="e.g., Homemade lasagna, fresh ingredients, prepared this morning. Serves 4-6 people."
          id="foodDetail"
        />

        <div className="py-5">
          <button
            onClick={handleDonorDetails}
            className="bg-green-600 hover:bg-green-700 p-1.5 rounded-sm font-medium tracking-wide cursor-pointer text-white w-full transition duration-200"
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
