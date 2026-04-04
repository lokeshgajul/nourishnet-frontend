import React, { useContext } from "react";
import { FiUploadCloud } from "react-icons/fi";
import Select from "react-dropdown-select";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { DontationContext } from "../../context/FoodDonationContext";
import { BiChevronRight, BiImageAdd } from "react-icons/bi";

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
    if (!foodDonationForm.foodTitle || !foodDonationForm.foodDescription || !foodDonationForm.expiresAt) {
      alert("Please fill in all required fields including expiration date.");
      return;
    }

    const expiryDate = new Date(foodDonationForm.expiresAt);
    if (isNaN(expiryDate.getTime()) || expiryDate <= new Date()) {
      alert("Please select a valid future date and time for expiration.");
      return;
    }

    await getDonorDetails();
    onNext();
  };

  const options = [
    { id: 1, name: "Cooked Meal" },
    { id: 2, name: "Packed Food" },
    { id: 3, name: "Fruits & Vegetables" },
    { id: 4, name: "Groceries" },
    { id: 5, name: "Others" },
  ];

  const inputClasses = "w-full bg-emerald-50/50 border-2 border-emerald-100/50 rounded-2xl px-6 py-4 text-emerald-950 font-black placeholder:text-emerald-900/40 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none";
  const labelClasses = "text-[11px] font-black uppercase tracking-[0.2em] text-emerald-950 mb-2 ml-4 block";

  return (
    <div className="w-full space-y-8">
      <div className="text-left mb-10">
        <h3 className="text-2xl font-black text-emerald-900 tracking-tight">Step 1: Item Details</h3>
        <div className="w-12 h-1 bg-primary rounded-full mt-2" />
      </div>

      {/* Food Title */}
      <div className="flex flex-col group">
        <label htmlFor="foodTitle" className={labelClasses}>Food Designation</label>
        <input
          type="text"
          name="foodTitle"
          id="foodTitle"
          value={foodDonationForm.foodTitle}
          onChange={(e) => handleFoodDonation("foodTitle", e.target.value)}
          placeholder="e.g. Fresh Vegetable Pasta"
          className={inputClasses}
          required
        />
      </div>

      {/* Expires At */}
      <div className="flex flex-col group">
        <label htmlFor="expiresAt" className={labelClasses}>Expiration Time</label>
        <input
          type="datetime-local"
          name="expiresAt"
          id="expiresAt"
          value={foodDonationForm.expiresAt}
          onChange={(e) => handleFoodDonation("expiresAt", e.target.value)}
          className={inputClasses}
          min={new Date(Date.now() + 60000).toISOString().slice(0, 16)}
          required
        />
      </div>

      {/* Image Upload Area */}
      <div className="flex flex-col">
        <label className={labelClasses}>Visual Verification</label>
        <div
          onClick={() => document.getElementById("image-upload-input").click()}
          className="group relative flex flex-col items-center justify-center h-64 bg-emerald-50/30 border-2 border-dashed border-emerald-200 rounded-[32px] cursor-pointer hover:bg-emerald-50 hover:border-primary overflow-hidden transition-all duration-500"
        >
          {!foodDonationForm.preview ? (
            <div className="flex flex-col items-center p-8 transition-transform group-hover:scale-105 duration-500">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary shadow-lg mb-4 group-hover:rotate-12 transition-transform">
                <BiImageAdd size={32} />
              </div>
              <p className="text-emerald-900 font-black text-sm uppercase tracking-widest">Deploy Image</p>
              <p className="text-emerald-800/40 text-[10px] font-bold mt-2">JPG, PNG or WEBP (Max 5MB)</p>
            </div>
          ) : (
            <div className="w-full h-full relative">
              <img
                src={foodDonationForm.preview}
                alt="Preview"
                className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700"
              />
              <div className="absolute inset-0 bg-emerald-900/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <p className="text-white font-black text-xs uppercase tracking-[0.3em]">Change Visual</p>
              </div>
            </div>
          )}
          <input
            id="image-upload-input"
            accept="image/*"
            type="file"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Food Category */}
        <div className="flex flex-col">
          <label className={labelClasses}>Asset Category</label>
          <div className="relative">
            <Select
              className="!bg-emerald-50/50 !border-2 !border-emerald-100/50 !rounded-2xl !px-4 !py-3 !text-emerald-900 !font-bold !transition-all !shadow-none"
              options={options}
              labelField="name"
              valueField="id"
              placeholder="Select Category"
              color="#10b981"
              onChange={(value) => handleFoodDonation("foodCategory", value[0].name)}
            />
          </div>
        </div>

        {/* Quantity */}
        <div className="flex flex-col">
          <label className={labelClasses}>Unit Quantity</label>
          <div className="flex items-center bg-emerald-50/50 border-2 border-emerald-100/50 rounded-2xl overflow-hidden p-1">
            <button
              type="button"
              className="w-12 h-12 flex items-center justify-center text-emerald-900 hover:bg-white rounded-xl transition-all"
              onClick={handleDecrement}
            >
              <FaMinus />
            </button>
            <span className="flex-1 text-center text-emerald-900 font-black text-lg">
              {foodDonationForm.foodQuantity}
            </span>
            <button
              type="button"
              className="w-12 h-12 flex items-center justify-center text-emerald-900 hover:bg-white rounded-xl transition-all"
              onClick={handleIncrement}
            >
              <FaPlus />
            </button>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col">
        <label htmlFor="foodDetail" className={labelClasses}>Mission Briefing</label>
        <textarea
          id="foodDetail"
          value={foodDonationForm.foodDescription}
          onChange={(e) => handleFoodDonation("foodDescription", e.target.value)}
          placeholder="Describe the condition, ingredients, and pickup notes..."
          className={`${inputClasses} h-40 resize-none py-6 align-top`}
        />
      </div>

      {/* Expiry Date */}
      <div className="flex flex-col group">
        <label htmlFor="expiresAt" className={labelClasses}>
          Expiry Date &amp; Time <span className="normal-case tracking-normal font-medium text-emerald-600/50">(optional)</span>
        </label>
        <input
          type="datetime-local"
          name="expiresAt"
          id="expiresAt"
          value={foodDonationForm.expiresAt}
          min={new Date().toISOString().slice(0, 16)}
          onChange={(e) => handleFoodDonation("expiresAt", e.target.value)}
          className={inputClasses}
        />
        <p className="text-[10px] text-emerald-700/50 font-bold mt-2 ml-4">
          The listing will be auto-deleted by the system once this time is reached.
        </p>
      </div>

      {/* Navigation */}
      <div className="pt-6">
        <button
          onClick={handleDonorDetails}
          className="w-full bg-primary hover:bg-emerald-400 text-white font-black py-5 rounded-[24px] shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-2 group"
        >
          Continue to Contact <BiChevronRight className="text-xl group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default DonationRequest;
