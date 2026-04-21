import React, { useState, useRef, useEffect } from "react";

const RulesAndPolicyModal = ({ onAccept }) => {
  const [isBottom, setIsBottom] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const contentRef = useRef();

  const handleScroll = () => {
    const el = contentRef.current;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
      setIsBottom(true);
    }
  };

  // Disable background scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const isEnabled = isBottom && isChecked;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b">
          <h2 className="text-lg font-bold text-emerald-600">
            NourishNet Guidelines
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Please review before continuing
          </p>
        </div>

        {/* Content */}
        <div className="relative">
          {/* Scrollable */}
          <div
            ref={contentRef}
            onScroll={handleScroll}
            className="h-96 overflow-y-scroll px-5 py-4 text-gray-700 space-y-4 text-sm scrollbar-hide"
          >
            <p>
              NourishNet connects donors with NGOs to reduce food waste and
              support communities. Please follow these guidelines:
            </p>

            <h3 className="font-semibold">General Guidelines</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Provide accurate donation details</li>
              <li>Ensure food is hygienic and safe</li>
              <li>Follow proper packaging standards</li>
              <li>Respect NGOs and beneficiaries</li>
            </ul>

            <h3 className="font-semibold">Prohibited</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Expired or unsafe food</li>
              <li>Fake or misleading listings</li>
              <li>Abusive behavior</li>
              <li>Platform misuse</li>
            </ul>

            <div className="bg-yellow-100 text-yellow-800 p-3 rounded-lg text-xs">
              ⚠️ Violations may lead to suspension or permanent ban.
            </div>

            <p className="text-xs text-gray-500">
              By continuing, you agree to comply with NourishNet policies.
            </p>
          </div>

          {/* Gradient */}
          {!isBottom && (
            <div className="pointer-events-none absolute bottom-10 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent" />
          )}

          {/* Scroll Hint */}
          {!isBottom && (
            <div className="absolute bottom-2 w-full flex justify-center text-xs text-gray-400 animate-bounce">
              Scroll ↓
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t space-y-3">
          {/* Checkbox */}
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              disabled={!isBottom}
              className="accent-emerald-500"
            />
            I have read and agree to the guidelines
          </label>

          {/* Button */}
          <div className="flex justify-end">
            <button
              disabled={!isEnabled}
              onClick={onAccept}
              className={`px-5 py-2 rounded-lg text-sm text-white transition ${
                isEnabled
                  ? "bg-emerald-500 hover:bg-emerald-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RulesAndPolicyModal;
