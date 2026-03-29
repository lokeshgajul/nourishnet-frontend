import React, { useState } from "react";
import DonateImg from "../../assets/images/donate.png";
import { RiNumber1, RiNumber2 } from "react-icons/ri";
import RequestStep1 from "../../components/DonationRequest/RequestStep1";
import RequestStep2 from "../../components/DonationRequest/RequestStep2";
import { BiHeart, BiLeaf, BiRocket } from "react-icons/bi";

const DonateFood = () => {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };
  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <div className="bg-[#d1fae5] min-h-screen pb-20">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px] -mr-40 -mt-20 opacity-70" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[130px] -ml-20 -mb-20 opacity-50" />
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white/40 backdrop-blur-3xl border-b border-emerald-200/50 pt-32 pb-20 shadow-sm">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -mr-40 -mt-20" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-in fade-in slide-in-from-left-10 duration-700">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                <BiHeart className="animate-pulse" /> Community Pulse Active
              </div>
              <h1 className="text-4xl lg:text-6xl font-black text-emerald-900 leading-tight mb-6 tracking-tight">
                Give food, <br />
                <span className="text-primary italic">Share Joy.</span>
              </h1>
              <p className="text-emerald-950 font-bold text-lg leading-relaxed max-w-lg mb-8">
                Donate surplus food effortlessly and make a direct impact on
                reducing waste and supporting communities in need. Your
                contribution brightens lives.
              </p>
              <button
                className="bg-emerald-900 text-white font-black px-8 py-4 rounded-2xl hover:bg-primary transition-all duration-300 shadow-xl hover:shadow-impact uppercase tracking-widest text-xs flex items-center gap-2 group"
                onClick={() => document.getElementById('donation-form').scrollIntoView({ behavior: 'smooth' })}
              >
                Start your Donation <BiRocket className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="relative animate-in fade-in zoom-in duration-1000">
              <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full scale-75" />
              <img
                src={DonateImg}
                alt="Donation"
                className="w-full max-w-md mx-auto relative z-10 drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Food Donation Form Section */}
      <div id="donation-form" className="max-w-4xl mx-auto px-6 mt-20">
        <div className="bg-white rounded-[40px] shadow-impact border border-emerald-50 overflow-hidden">
          <div className="p-8 lg:p-12 text-center bg-emerald-50/30 border-b border-emerald-50">
            <h2 className="text-3xl lg:text-4xl font-black text-emerald-900 tracking-tight mb-2">
              Food Donation Form
            </h2>
            <p className="text-emerald-950 font-black text-sm tracking-wide uppercase italic">
              Fill out the details to donate your surplus
            </p>

            <div className="flex justify-center items-center mt-12 w-full max-w-md mx-auto px-4">
              <div 
                className={`relative flex items-center justify-center w-12 h-12 rounded-2xl font-black transition-all duration-500 cursor-pointer ${
                  step === 1 ? "bg-emerald-900 text-white shadow-lg scale-110" : "bg-emerald-100 text-emerald-900"
                }`}
                onClick={step === 2 ? handleBack : undefined}
              >
                1
                {step === 1 && <div className="absolute inset-0 rounded-2xl border-4 border-emerald-900/20 animate-ping" />}
              </div>

              <div className="flex-1 h-1 mx-4 bg-emerald-100 relative overflow-hidden">
                <div 
                  className="absolute inset-y-0 left-0 bg-emerald-900 transition-all duration-500" 
                  style={{ width: step === 2 ? '100%' : '0%' }}
                />
              </div>

              <div 
                className={`flex items-center justify-center w-12 h-12 rounded-2xl font-black transition-all duration-500 ${
                  step === 2 ? "bg-emerald-900 text-white shadow-lg scale-110" : "bg-emerald-100 text-emerald-900"
                }`}
              >
                2
              </div>
            </div>
          </div>

          <div className="p-8 lg:p-12 animate-in fade-in slide-in-from-bottom-5 duration-500">
            {step === 1 && <RequestStep1 onNext={handleNext} />}
            {step === 2 && <RequestStep2 onBack={handleBack} />}
          </div>
        </div>
        
        <p className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-emerald-900/30 mt-12">
          Secure Payload Transfer Active // NourishNet v2.6.0
        </p>
      </div>
    </div>
  );
};

export default DonateFood;
