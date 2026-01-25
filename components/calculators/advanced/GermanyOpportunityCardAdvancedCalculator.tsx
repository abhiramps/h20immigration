"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";

export const GermanyOpportunityCardAdvancedCalculator = () => {
  const [points, setPoints] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const [formData, setFormData] = useState({
    partialRecognition: false,
    shortageOccupation: false,
    experience: "none",
    german: "none",
    english: "none",
    age: "under35",
    stayInGermany: false,
    partner: false,
  });

  const calculatePoints = () => {
    let total = 0;

    // 1. Qualification
    if (formData.partialRecognition) total += 4;
    if (formData.shortageOccupation) total += 1;

    // 2. Work Experience
    if (formData.experience === "5y") total += 3;
    else if (formData.experience === "2y") total += 2;

    // 3. Language
    // German
    if (formData.german === "B2") total += 3;
    else if (formData.german === "B1") total += 2;
    else if (formData.german === "A2") total += 1;

    // English (C1 = 1 pt)
    if (formData.english === "C1") total += 1;

    // 4. Age
    if (formData.age === "under35") total += 2;
    else if (formData.age === "35-40") total += 1;

    // 5. Connection to Germany (1 pt)
    if (formData.stayInGermany) total += 1;

    // 6. Partner Application (1 pt)
    if (formData.partner) total += 1;

    setPoints(total);
    setShowResult(true);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 md:p-8 bg-gradient-to-r from-primary/5 to-transparent border-b border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900">Germany Opportunity Card (Chancenkarte) Calculator</h1>
          <p className="text-gray-600 mt-2">
            Calculate your eligibility for the German Opportunity Card. You need a minimum of 6 points to qualify.
          </p>
      </div>

      <div className="p-6 md:p-8 space-y-10">
        
        {/* Basic Requirements Note */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <h4 className="font-bold text-yellow-800 text-sm uppercase mb-1">Mandatory Basic Requirements</h4>
            <p className="text-yellow-800 text-sm leading-relaxed">
                Before collecting points, you must meet these basic criteria:
                <br />1. Completed at least 2 years of vocational training or university degree recognized in your country of origin.
                <br />2. German language skills at A1 level OR English language skills at B2 level.
                <br />3. Proof of financial self-sufficiency.
            </p>
        </div>

        {/* 1. Qualification */}
        <section>
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3 text-sm">1</span>
                Qualification (Maximum 4 Points)
            </h3>
            <div className="space-y-3 pl-11">
                <label className={`block p-4 rounded-lg border cursor-pointer transition-all ${formData.partialRecognition ? 'bg-blue-50 border-primary ring-1 ring-primary' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                    <div className="flex items-start">
                        <input 
                            type="checkbox" 
                            className="w-5 h-5 mt-1 text-primary border-gray-300 rounded focus:ring-primary"
                            checked={formData.partialRecognition}
                            onChange={(e) => setFormData({...formData, partialRecognition: e.target.checked})}
                        />
                        <div className="ml-3 flex-1">
                            <span className="text-gray-800 font-medium">Partial Recognition of Foreign Qualification</span>
                            <p className="text-gray-500 text-sm mt-1">Your qualification is partially recognized in Germany. Also applies for regulated professions where compensatory measures are needed.</p>
                        </div>
                        <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-white text-xs font-bold text-primary border border-primary/20 ml-2 whitespace-nowrap">
                            4 pts
                        </span>
                    </div>
                </label>
                <label className={`block p-4 rounded-lg border cursor-pointer transition-all ${formData.shortageOccupation ? 'bg-blue-50 border-primary ring-1 ring-primary' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                    <div className="flex items-start">
                        <input 
                            type="checkbox" 
                            className="w-5 h-5 mt-1 text-primary border-gray-300 rounded focus:ring-primary"
                            checked={formData.shortageOccupation}
                            onChange={(e) => setFormData({...formData, shortageOccupation: e.target.checked})}
                        />
                        <div className="ml-3 flex-1">
                            <span className="text-gray-800 font-medium">Qualification in a Shortage Occupation</span>
                            <p className="text-gray-500 text-sm mt-1">Your qualification is in a designated shortage occupation (e.g., IT, Engineering, Healthcare, Teaching).</p>
                        </div>
                        <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-white text-xs font-bold text-primary border border-primary/20 ml-2 whitespace-nowrap">
                            1 pt
                        </span>
                    </div>
                </label>
            </div>
        </section>

        {/* 2. Professional Experience */}
        <section>
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3 text-sm">2</span>
                Professional Experience (Maximum 3 Points)
            </h3>
             <div className="space-y-3 pl-11">
                {[
                    { val: "none", label: "Less than 2 years relevant experience", pts: 0 },
                    { val: "2y", label: "At least 2 years professional experience (within last 5 years)", pts: 2 },
                    { val: "5y", label: "At least 5 years professional experience (within last 7 years)", pts: 3 },
                ].map((opt) => (
                    <label key={opt.val} className={`block p-4 rounded-lg border cursor-pointer transition-all ${formData.experience === opt.val ? 'bg-blue-50 border-primary ring-1 ring-primary' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                        <div className="flex items-center">
                            <input 
                                type="radio" 
                                name="experience"
                                className="w-5 h-5 text-primary border-gray-300 focus:ring-primary"
                                checked={formData.experience === opt.val}
                                onChange={() => setFormData({...formData, experience: opt.val})}
                            />
                            <div className="ml-3 flex-1">
                                <span className="text-gray-800 font-medium">{opt.label}</span>
                            </div>
                            <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-white text-xs font-bold text-primary border border-primary/20">
                                {opt.pts} pts
                            </span>
                        </div>
                    </label>
                ))}
            </div>
        </section>

        {/* 3. Language Skills */}
        <section>
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3 text-sm">3</span>
                Language Skills (Maximum 4 Points)
            </h3>
            
            <div className="pl-11 mb-6">
                <h4 className="font-semibold text-gray-700 mb-3">German Language Level</h4>
                <div className="space-y-3">
                    {[
                        { val: "none", label: "Below A2", pts: 0 },
                        { val: "A2", label: "German A2 (CEFR)", pts: 1 },
                        { val: "B1", label: "German B1 (CEFR)", pts: 2 },
                        { val: "B2", label: "German B2 (CEFR) or higher", pts: 3 },
                    ].map((opt) => (
                        <label key={opt.val} className={`block p-4 rounded-lg border cursor-pointer transition-all ${formData.german === opt.val ? 'bg-blue-50 border-primary ring-1 ring-primary' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                            <div className="flex items-center">
                                <input 
                                    type="radio" 
                                    name="german"
                                    className="w-5 h-5 text-primary border-gray-300 focus:ring-primary"
                                    checked={formData.german === opt.val}
                                    onChange={() => setFormData({...formData, german: opt.val})}
                                />
                                <div className="ml-3 flex-1">
                                    <span className="text-gray-800 font-medium">{opt.label}</span>
                                </div>
                                <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-white text-xs font-bold text-primary border border-primary/20">
                                    {opt.pts} pts
                                </span>
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            <div className="pl-11">
                <h4 className="font-semibold text-gray-700 mb-3">English Language Level</h4>
                <label className={`block p-4 rounded-lg border cursor-pointer transition-all ${formData.english === 'C1' ? 'bg-blue-50 border-primary ring-1 ring-primary' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                    <div className="flex items-center">
                        <input 
                            type="checkbox" 
                            className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                            checked={formData.english === 'C1'}
                            onChange={(e) => setFormData({...formData, english: e.target.checked ? 'C1' : 'none'})}
                        />
                        <div className="ml-3 flex-1">
                            <span className="text-gray-800 font-medium">English C1 (CEFR) or higher / Native Speaker</span>
                        </div>
                        <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-white text-xs font-bold text-primary border border-primary/20">
                            1 pt
                        </span>
                    </div>
                </label>
            </div>
        </section>

        {/* 4. Age */}
        <section>
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3 text-sm">4</span>
                Age (Maximum 2 Points)
            </h3>
            <div className="space-y-3 pl-11">
                {[
                    { val: "under35", label: "Not older than 35 years", pts: 2 },
                    { val: "35-40", label: "Between 35 and 40 years old", pts: 1 },
                    { val: "over40", label: "Older than 40 years", pts: 0 },
                ].map((opt) => (
                    <label key={opt.val} className={`block p-4 rounded-lg border cursor-pointer transition-all ${formData.age === opt.val ? 'bg-blue-50 border-primary ring-1 ring-primary' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                        <div className="flex items-center">
                            <input 
                                type="radio" 
                                name="age"
                                className="w-5 h-5 text-primary border-gray-300 focus:ring-primary"
                                checked={formData.age === opt.val}
                                onChange={() => setFormData({...formData, age: opt.val})}
                            />
                            <div className="ml-3 flex-1">
                                <span className="text-gray-800 font-medium">{opt.label}</span>
                            </div>
                            <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-white text-xs font-bold text-primary border border-primary/20">
                                {opt.pts} pts
                            </span>
                        </div>
                    </label>
                ))}
            </div>
        </section>

        {/* 5. Connection to Germany & Partner */}
        <section>
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3 text-sm">5</span>
                Connection to Germany & Partner (Maximum 1 Point Each)
            </h3>
            <div className="space-y-3 pl-11">
                 <label className={`block p-4 rounded-lg border cursor-pointer transition-all ${formData.stayInGermany ? 'bg-blue-50 border-primary ring-1 ring-primary' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                    <div className="flex items-start">
                        <input 
                            type="checkbox" 
                            className="w-5 h-5 mt-1 text-primary border-gray-300 rounded focus:ring-primary"
                            checked={formData.stayInGermany}
                            onChange={(e) => setFormData({...formData, stayInGermany: e.target.checked})}
                        />
                        <div className="ml-3 flex-1">
                            <span className="text-gray-800 font-medium">Previous Stay in Germany</span>
                            <p className="text-gray-500 text-sm mt-1">Legally resided in Germany for at least 6 consecutive months in the last 5 years (excluding tourist visits).</p>
                        </div>
                        <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-white text-xs font-bold text-primary border border-primary/20 ml-2 whitespace-nowrap">
                            1 pt
                        </span>
                    </div>
                </label>
                <label className={`block p-4 rounded-lg border cursor-pointer transition-all ${formData.partner ? 'bg-blue-50 border-primary ring-1 ring-primary' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                    <div className="flex items-start">
                        <input 
                            type="checkbox" 
                            className="w-5 h-5 mt-1 text-primary border-gray-300 rounded focus:ring-primary"
                            checked={formData.partner}
                            onChange={(e) => setFormData({...formData, partner: e.target.checked})}
                        />
                        <div className="ml-3 flex-1">
                            <span className="text-gray-800 font-medium">Partner Application</span>
                            <p className="text-gray-500 text-sm mt-1">Your spouse/partner also qualifies for the Opportunity Card and you are applying together.</p>
                        </div>
                        <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-white text-xs font-bold text-primary border border-primary/20 ml-2 whitespace-nowrap">
                            1 pt
                        </span>
                    </div>
                </label>
            </div>
        </section>

        <div className="pt-8 border-t border-gray-100 flex flex-col items-center">
            <Button 
                onClick={calculatePoints}
                size="lg"
                className="w-full md:w-auto px-16 py-5 text-xl font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
            >
                Calculate Total Score
            </Button>
        </div>

        <AnimatePresence>
            {showResult && (
                <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                >
                    <div className={`mt-8 p-8 rounded-2xl text-center border-2 ${points >= 6 ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'}`}>
                        <p className="text-gray-600 text-lg font-medium mb-2">Total Points Awarded</p>
                        <div className="flex items-baseline justify-center gap-2 mb-4">
                             <span className={`text-6xl font-extrabold ${points >= 6 ? 'text-green-600' : 'text-orange-500'}`}>
                                {points}
                            </span>
                            <span className="text-3xl text-gray-400 font-bold">/ 6</span>
                        </div>
                       
                        <div className="h-px w-full bg-black/10 my-6"></div>
                        
                        <p className={`text-2xl font-bold mb-2 ${points >= 6 ? 'text-green-700' : 'text-orange-700'}`}>
                            {points >= 6 
                                ? "You meet the 6 points requirement!" 
                                : "You are below the 6 points threshold."}
                        </p>
                        <p className="text-gray-600 max-w-lg mx-auto">
                             {points >= 6 
                                ? "Congratulations! You have enough points for the Opportunity Card. Ensure you also meet the mandatory basic requirements." 
                                : "You need at least 6 points. Try improving your language skills or verifying if your partial recognition status applies."}
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

      </div>
    </div>
  );
};
