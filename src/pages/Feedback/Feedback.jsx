import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Feedback = () => {
  const [role, setRole] = useState("Donor");
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/feedback",
        { feedback },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.data;
      console.log("Data ", data);

      alert("Thank you for your feedback!");
      setFeedback("");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 mt-14">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
        Share Your Feedback
      </h1>

      <p className="text-gray-600 text-center mb-8">
        We value your feedback! Whether you are a donor or an NGO, your input
        helps us improve and serve the community better.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 space-y-6"
      >
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Your Feedback
          </label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows="5"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-400"
            placeholder="Write your feedback here..."
            required
          ></textarea>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default Feedback;
