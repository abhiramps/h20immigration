"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";

export const SaskatchewanPNPAdvancedCalculator = () => {
  const [points, setPoints] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const [formData, setFormData] = useState({
    education: "masters",
    experience5y: "5", 
    experience6to10y: "5",
    languageFirst: "clb8",
    languageSecond: "none",
    age: "22-34",
    connection: {
        offer: false,
        relative: false,
        pastWork: false,
        pastStudent: false
    }
  });

  const calculatePoints = () => {
    let total = 0;

    // 1. Education (Max 23)
    const eduMap: Record<string, number> = {
      "masters": 23,
      "bachelors": 20, 
      "trade": 20,
      "diploma_2y": 15,
      "diploma_1y": 12,
    };
    total += eduMap[formData.education] || 0;

    // 2. Experience (Max 15)
    // a) Last 5 years (Max 10)
    const exp5yMap: Record<string, number> = {
        "5": 10, "4": 8, "3": 6, "2": 4, "1": 2, "0": 0
    };
    total += exp5yMap[formData.experience5y] || 0;

    // b) 6-10 years prior (Max 5)
    const exp6to10yMap: Record<string, number> = {
        "5": 5, "4": 4, "3": 3, "2": 2, "0": 0
    };
    total += exp6to10yMap[formData.experience6to10y] || 0;

    // 3. Language (Max 30)
    // a) First Language (Max 20)
    const lang1Map: Record<string, number> = {
        "clb8": 20, "clb7": 18, "clb6": 16, "clb5": 14, "clb4": 12, "none": 0
    };
    total += lang1Map[formData.languageFirst] || 0;

    // b) Second Language (Max 10)
    const lang2Map: Record<string, number> = {
        "clb8": 10, "clb7": 8, "clb6": 6, "clb5": 4, "clb4": 2, "none": 0
    };
    total += lang2Map[formData.languageSecond] || 0;

    // 4. Age (Max 12)
    const ageMap: Record<string, number> = {
        "18-21": 8,
        "22-34": 12,
        "35-45": 10,
        "46-50": 8,
        "other": 0
    };
    total += ageMap[formData.age] || 0;

    // 5. Connection (Max 30)
    let connPoints = 0;
    if (formData.connection.offer) connPoints += 30;
    if (formData.connection.relative) connPoints += 20;
    if (formData.connection.pastWork) connPoints += 5;
    if (formData.connection.pastStudent) connPoints += 5;
    
    total += Math.min(connPoints, 30);

    setPoints(total);
    setShowResult(true);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 md:p-8 bg-gradient-to-r from-primary/5 to-transparent border-b border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900">Saskatchewan (SINP) Assessment Grid</h1>
          <p className="text-gray-600 mt-2">
            Calculate your score for the International Skilled Worker category. You need 60 out of 110 points.
          </p>
      </div>
      
      <div className="p-6 md:p-8 space-y-10">
        
        {/* 1. Education */}
        <section>
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3 text-sm">1</span>
                Education and Training (Maximum 23 Points)
            </h3>
            <div className="space-y-3 pl-11">
                {[
                    { val: "masters", label: "Master’s or Doctorate degree (Canadian equivalency)", pts: 23 },
                    { val: "bachelors", label: "Bachelor’s degree OR at least a three-year degree at a university or college", pts: 20 },
                    { val: "trade", label: "Trade certification equivalent to journeyperson status in Saskatchewan", pts: 20 },
                    { val: "diploma_2y", label: "Canadian equivalency diploma that requires two (but less than three) years at a university, college, trade or technical school, or other post-secondary institution", pts: 15 },
                    { val: "diploma_1y", label: "Canadian equivalency certificate or at least two semesters (but less than a two-year program) at a university, college, trade or technical school, or other post-secondary institution", pts: 12 },
                ].map((opt) => (
                    <label key={opt.val} className={`block p-4 rounded-lg border cursor-pointer transition-all ${formData.education === opt.val ? 'bg-blue-50 border-primary ring-1 ring-primary' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                        <div className="flex items-center">
                            <input 
                                type="radio" 
                                name="education"
                                className="w-5 h-5 text-primary border-gray-300 focus:ring-primary"
                                checked={formData.education === opt.val}
                                onChange={() => setFormData({...formData, education: opt.val})}
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

        {/* 2. Experience */}
        <section>
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3 text-sm">2</span>
                Skilled Work Experience (Maximum 15 Points)
            </h3>
            
            <div className="pl-11 mb-6">
                <h4 className="font-semibold text-gray-700 mb-3">a) In the 5 years prior to application submission date</h4>
                <div className="space-y-3">
                    {[
                        { val: "5", label: "5 years", pts: 10 },
                        { val: "4", label: "4 years", pts: 8 },
                        { val: "3", label: "3 years", pts: 6 },
                        { val: "2", label: "2 years", pts: 4 },
                        { val: "1", label: "1 year", pts: 2 },
                    ].map((opt) => (
                        <label key={opt.val} className={`block p-4 rounded-lg border cursor-pointer transition-all ${formData.experience5y === opt.val ? 'bg-blue-50 border-primary ring-1 ring-primary' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                            <div className="flex items-center">
                                <input 
                                    type="radio" 
                                    name="experience5y"
                                    className="w-5 h-5 text-primary border-gray-300 focus:ring-primary"
                                    checked={formData.experience5y === opt.val}
                                    onChange={() => setFormData({...formData, experience5y: opt.val})}
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
                <h4 className="font-semibold text-gray-700 mb-3">b) In the 6-10 years prior to application submission date</h4>
                <div className="space-y-3">
                    {[
                        { val: "5", label: "5 years", pts: 5 },
                        { val: "4", label: "4 years", pts: 4 },
                        { val: "3", label: "3 years", pts: 3 },
                        { val: "2", label: "2 years", pts: 2 },
                        { val: "0", label: "Less than 2 years", pts: 0 },
                    ].map((opt) => (
                        <label key={opt.val} className={`block p-4 rounded-lg border cursor-pointer transition-all ${formData.experience6to10y === opt.val ? 'bg-blue-50 border-primary ring-1 ring-primary' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                            <div className="flex items-center">
                                <input 
                                    type="radio" 
                                    name="experience6to10y"
                                    className="w-5 h-5 text-primary border-gray-300 focus:ring-primary"
                                    checked={formData.experience6to10y === opt.val}
                                    onChange={() => setFormData({...formData, experience6to10y: opt.val})}
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
        </section>

        {/* 3. Language */}
        <section>
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3 text-sm">3</span>
                Language Ability (Maximum 30 Points)
            </h3>
            
            <div className="pl-11 mb-6">
                <h4 className="font-semibold text-gray-700 mb-3">First Official Language (English or French)</h4>
                <div className="space-y-3">
                    {[
                        { val: "clb8", label: "CLB 8 and higher", pts: 20 },
                        { val: "clb7", label: "CLB 7", pts: 18 },
                        { val: "clb6", label: "CLB 6", pts: 16 },
                        { val: "clb5", label: "CLB 5", pts: 14 },
                        { val: "clb4", label: "CLB 4", pts: 12 },
                        { val: "none", label: "Less than CLB 4", pts: 0 },
                    ].map((opt) => (
                        <label key={opt.val} className={`block p-4 rounded-lg border cursor-pointer transition-all ${formData.languageFirst === opt.val ? 'bg-blue-50 border-primary ring-1 ring-primary' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                            <div className="flex items-center">
                                <input 
                                    type="radio" 
                                    name="languageFirst"
                                    className="w-5 h-5 text-primary border-gray-300 focus:ring-primary"
                                    checked={formData.languageFirst === opt.val}
                                    onChange={() => setFormData({...formData, languageFirst: opt.val})}
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
                <h4 className="font-semibold text-gray-700 mb-3">Second Official Language (English or French)</h4>
                <div className="space-y-3">
                    {[
                        { val: "clb8", label: "CLB 8 and higher", pts: 10 },
                        { val: "clb7", label: "CLB 7", pts: 8 },
                        { val: "clb6", label: "CLB 6", pts: 6 },
                        { val: "clb5", label: "CLB 5", pts: 4 },
                        { val: "clb4", label: "CLB 4", pts: 2 },
                        { val: "none", label: "Not Applicable / Less than CLB 4", pts: 0 },
                    ].map((opt) => (
                        <label key={opt.val} className={`block p-4 rounded-lg border cursor-pointer transition-all ${formData.languageSecond === opt.val ? 'bg-blue-50 border-primary ring-1 ring-primary' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                            <div className="flex items-center">
                                <input 
                                    type="radio" 
                                    name="languageSecond"
                                    className="w-5 h-5 text-primary border-gray-300 focus:ring-primary"
                                    checked={formData.languageSecond === opt.val}
                                    onChange={() => setFormData({...formData, languageSecond: opt.val})}
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
        </section>

        {/* 4. Age */}
        <section>
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3 text-sm">4</span>
                Age (Maximum 12 Points)
            </h3>
            <div className="space-y-3 pl-11">
                {[
                    { val: "18-21", label: "18 – 21 years", pts: 8 },
                    { val: "22-34", label: "22 – 34 years", pts: 12 },
                    { val: "35-45", label: "35 – 45 years", pts: 10 },
                    { val: "46-50", label: "46 – 50 years", pts: 8 },
                    { val: "other", label: "Less than 18 or More than 50 years", pts: 0 },
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

        {/* 5. Adaptability */}
        <section>
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3 text-sm">5</span>
                Connection to Saskatchewan Labour Market & Adaptability (Maximum 30 Points)
            </h3>
            <div className="space-y-3 pl-11">
                {[
                    { key: "offer", label: "High skilled employment offer from a Saskatchewan employer", pts: 30 },
                    { key: "relative", label: "Close family relative in Saskatchewan (The applicant or accompanying spouse has a close family relative who is a Canadian citizen or permanent resident living in Saskatchewan)", pts: 20 },
                    { key: "pastWork", label: "Past work experience in Saskatchewan (at least 12 months of work in the past five years on a valid work permit)", pts: 5 },
                    { key: "pastStudent", label: "Past student experience in Saskatchewan (at least one full-time academic year at a recognized Saskatchewan post-secondary education institution on a valid study permit)", pts: 5 },
                ].map((opt) => (
                    <label key={opt.key} className={`block p-4 rounded-lg border cursor-pointer transition-all ${formData.connection[opt.key as keyof typeof formData.connection] ? 'bg-blue-50 border-primary ring-1 ring-primary' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                        <div className="flex items-start">
                            <input 
                                type="checkbox" 
                                className="w-5 h-5 mt-1 text-primary border-gray-300 rounded focus:ring-primary"
                                checked={formData.connection[opt.key as keyof typeof formData.connection]}
                                onChange={(e) => setFormData({...formData, connection: {...formData.connection, [opt.key]: e.target.checked}})}
                            />
                            <div className="ml-3 flex-1">
                                <span className="text-gray-800 leading-relaxed">{opt.label}</span>
                            </div>
                            <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-white text-xs font-bold text-primary border border-primary/20 ml-2 whitespace-nowrap">
                                {opt.pts} pts
                            </span>
                        </div>
                    </label>
                ))}
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
                    <div className={`mt-8 p-8 rounded-2xl text-center border-2 ${points >= 60 ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'}`}>
                        <p className="text-gray-600 text-lg font-medium mb-2">Total Points Awarded</p>
                        <div className="flex items-baseline justify-center gap-2 mb-4">
                             <span className={`text-6xl font-extrabold ${points >= 60 ? 'text-green-600' : 'text-orange-500'}`}>
                                {points}
                            </span>
                            <span className="text-3xl text-gray-400 font-bold">/ 110</span>
                        </div>
                       
                        <div className="h-px w-full bg-black/10 my-6"></div>
                        
                        <p className={`text-2xl font-bold mb-2 ${points >= 60 ? 'text-green-700' : 'text-orange-700'}`}>
                            {points >= 60 
                                ? "You meet the 60 points requirement!" 
                                : "You are below the 60 points threshold."}
                        </p>
                        <p className="text-gray-600 max-w-lg mx-auto">
                             {points >= 60 
                                ? "Congratulations! You may be eligible for the Saskatchewan Immigrant Nominee Program (SINP)." 
                                : "You need at least 60 points to be eligible. Consider improving your language scores or gaining more experience."}
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

      </div>
    </div>
  );
};
