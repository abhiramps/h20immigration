"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";

export const CanadaPRAdvancedCalculator = () => {
  const [points, setPoints] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const [formData, setFormData] = useState({
    age: "18-35",
    education: "masters",
    experience: "1",
    languageReading: "7",
    languageWriting: "7",
    languageListening: "7.5",
    languageSpeaking: "7",
    arrangedEmployment: "no",
    adaptability: {
      partnerLanguage: false,
      studyInCanada: false,
      partnerStudyInCanada: false,
      workInCanada: false,
      partnerWorkInCanada: false,
      relativeInCanada: false,
      arrangedEmployment: false // "Arranged Employment" is also listed in adaptability in some contexts, but usually separate. 
                                // The reference link has "Arranged Employment" as a separate main factor AND sometimes as an adaptability bonus?
                                // Let's check the extracted text. The text shows "Arranged Employment in Canada" under Adaptability.
                                // However, FSW 67 points usually has "Arranged Employment" (10 pts) as Factor 5, and Adaptability (10 pts) as Factor 6.
                                // If "Arranged Employment" is ticked in Adaptability, it usually refers to the 5 points adaptability bonus for having arranged employment.
                                // But let's follow the extracted text options strictly.
    },
  });

  const calculatePoints = () => {
    let total = 0;

    // 1. Age (Max 12)
    const ageMap: Record<string, number> = {
      "under18": 0,
      "18-35": 12,
      "36": 11,
      "37": 10,
      "38": 9,
      "39": 8,
      "40": 7,
      "41": 6,
      "42": 5,
      "43": 4,
      "44": 3,
      "45": 2,
      "46": 1,
      "47+": 0,
    };
    total += ageMap[formData.age] || 0;

    // 2. Education (Max 25)
    const eduMap: Record<string, number> = {
      "phd": 25,
      "masters": 23,
      "two_degrees": 22,
      "bachelors_3y": 21,
      "diploma_2y": 19,
      "diploma_1y": 15,
      "highschool": 5,
    };
    total += eduMap[formData.education] || 0;

    // 3. Work Experience (Max 15)
    const expMap: Record<string, number> = {
      "1": 9,
      "2-3": 11,
      "4-5": 13,
      "6+": 15,
    };
    total += expMap[formData.experience] || 0;

    // 4. Language Skills (Max 24 - Simplified logic same as Quick for now)
    // In a real advanced calculator, we might want precise CLB conversion tables.
    const calcIELTSPoints = (type: 'R'|'W'|'L'|'S', score: number) => {
         // CLB 9 check (6 pts)
         if (
            (type === 'R' && score >= 7) ||
            (type === 'W' && score >= 7) ||
            (type === 'L' && score >= 8) ||
            (type === 'S' && score >= 7)
         ) return 6;
         // CLB 8 check (5 pts)
         if (
            (type === 'R' && score >= 6.5) ||
            (type === 'W' && score >= 6.5) ||
            (type === 'L' && score >= 7.5) ||
            (type === 'S' && score >= 6.5)
         ) return 5;
         // CLB 7 check (4 pts)
         if (
            (type === 'R' && score >= 6) ||
            (type === 'W' && score >= 6) ||
            (type === 'L' && score >= 6) ||
            (type === 'S' && score >= 6)
         ) return 4;
         return 0;
    };

    let langTotal = 0;
    langTotal += calcIELTSPoints('R', parseFloat(formData.languageReading));
    langTotal += calcIELTSPoints('W', parseFloat(formData.languageWriting));
    langTotal += calcIELTSPoints('L', parseFloat(formData.languageListening));
    langTotal += calcIELTSPoints('S', parseFloat(formData.languageSpeaking));
    total += langTotal;

    // 5. Arranged Employment (Max 10)
    // The reference has a specific section for this.
    if (formData.arrangedEmployment === "yes") total += 10;

    // 6. Adaptability (Max 10)
    let adaptPoints = 0;
    if (formData.adaptability.partnerLanguage) adaptPoints += 5;
    if (formData.adaptability.studyInCanada) adaptPoints += 5;
    if (formData.adaptability.partnerStudyInCanada) adaptPoints += 5;
    if (formData.adaptability.workInCanada) adaptPoints += 10;
    if (formData.adaptability.partnerWorkInCanada) adaptPoints += 5;
    if (formData.adaptability.relativeInCanada) adaptPoints += 5;
    if (formData.adaptability.arrangedEmployment) adaptPoints += 5; // Bonus for arranged employment under adaptability
    
    total += Math.min(adaptPoints, 10);

    setPoints(total);
    setShowResult(true);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 md:p-8 bg-gradient-to-r from-primary/5 to-transparent border-b border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900">Canada FSW 67 Points Calculator</h1>
          <p className="text-gray-600 mt-2">
            Calculate your eligibility for the Federal Skilled Worker Program. You need a minimum of 67 points to qualify.
          </p>
      </div>
      
      <div className="p-6 md:p-8 space-y-10">
        
        {/* 1. Education */}
        <section>
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3 text-sm">1</span>
                Education (Maximum 25 Points)
            </h3>
            <div className="space-y-3 pl-11">
                {[
                    { val: "phd", label: "University degree at the Doctoral (PhD) level or equal", pts: 25 },
                    { val: "masters", label: "University degree at the Master’s level or equal OR University level entry-to-practice professional degree (or equal)", pts: 23 },
                    { val: "two_degrees", label: "Two or more Canadian post-secondary degrees or diplomas or equal (at least one must be for a program of at least three years)", pts: 22 },
                    { val: "bachelors_3y", label: "Canadian post-secondary degree or diploma for a program of three years or longer, or equal", pts: 21 },
                    { val: "diploma_2y", label: "Canadian post-secondary degree or diploma for a program of two years, or equal", pts: 19 },
                    { val: "diploma_1y", label: "Canadian post-secondary degree or diploma for a program of one year, or equal", pts: 15 },
                    { val: "highschool", label: "Canadian high school diploma, or equal", pts: 5 },
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

        {/* 2. Language */}
        <section>
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3 text-sm">2</span>
                Language Proficiency (Maximum 24 Points)
            </h3>
            <p className="text-sm text-gray-500 mb-4 pl-11">Enter your IELTS General Training test scores.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pl-11">
                {['Reading', 'Writing', 'Listening', 'Speaking'].map((skill) => (
                    <div key={skill} className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 block uppercase tracking-wide">{skill}</label>
                        <select 
                        className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-primary/20 outline-none"
                        value={formData[`language${skill}` as keyof typeof formData] as string}
                        onChange={(e) => setFormData({...formData, [`language${skill}`]: e.target.value})}
                        >
                        <option value="8">8.0+</option>
                        <option value="7.5">7.5</option>
                        <option value="7">7.0</option>
                        <option value="6.5">6.5</option>
                        <option value="6">6.0</option>
                        <option value="5.5">5.5</option>
                        <option value="5">5.0</option>
                        </select>
                    </div>
                ))}
            </div>
        </section>

        {/* 3. Age */}
        <section>
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3 text-sm">3</span>
                Age (Maximum 12 Points)
            </h3>
            <div className="pl-11 max-w-md">
                <select 
                    className="w-full p-4 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-primary/20 outline-none font-medium text-gray-700"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                >
                    <option value="under18">Under 18</option>
                    <option value="18-35">18 - 35 (12 Points)</option>
                    {[...Array(12)].map((_, i) => (
                        <option key={i} value={(36+i).toString()}>{36+i} ({11-i} Points)</option>
                    ))}
                    <option value="47+">47 or older (0 Points)</option>
                </select>
            </div>
        </section>

        {/* 4. Experience */}
        <section>
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3 text-sm">4</span>
                Work Experience (Maximum 15 Points)
            </h3>
            <div className="space-y-3 pl-11">
                {[
                    { val: "1", label: "1 year", pts: 9 },
                    { val: "2-3", label: "2 - 3 years", pts: 11 },
                    { val: "4-5", label: "4 - 5 years", pts: 13 },
                    { val: "6+", label: "6 or more years", pts: 15 },
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

        {/* 5. Arranged Employment */}
        <section>
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3 text-sm">5</span>
                Arranged Employment in Canada (Maximum 10 Points)
            </h3>
            <div className="space-y-3 pl-11">
                 <label className={`block p-4 rounded-lg border cursor-pointer transition-all ${formData.arrangedEmployment === 'yes' ? 'bg-blue-50 border-primary ring-1 ring-primary' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                    <div className="flex items-center">
                        <input 
                            type="radio" 
                            name="arrangedEmployment"
                            className="w-5 h-5 text-primary border-gray-300 focus:ring-primary"
                            checked={formData.arrangedEmployment === 'yes'}
                            onChange={() => setFormData({...formData, arrangedEmployment: 'yes'})}
                        />
                        <div className="ml-3 flex-1">
                            <span className="text-gray-800 font-medium">Yes, I have a valid job offer from a Canadian employer</span>
                        </div>
                        <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-white text-xs font-bold text-primary border border-primary/20">
                            10 pts
                        </span>
                    </div>
                </label>
                <label className={`block p-4 rounded-lg border cursor-pointer transition-all ${formData.arrangedEmployment === 'no' ? 'bg-blue-50 border-primary ring-1 ring-primary' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                    <div className="flex items-center">
                        <input 
                            type="radio" 
                            name="arrangedEmployment"
                            className="w-5 h-5 text-primary border-gray-300 focus:ring-primary"
                            checked={formData.arrangedEmployment === 'no'}
                            onChange={() => setFormData({...formData, arrangedEmployment: 'no'})}
                        />
                        <div className="ml-3 flex-1">
                            <span className="text-gray-800 font-medium">No valid job offer</span>
                        </div>
                    </div>
                </label>
            </div>
        </section>

        {/* 6. Adaptability */}
        <section>
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3 text-sm">6</span>
                Adaptability (Maximum 10 Points)
            </h3>
            <div className="space-y-3 pl-11">
                {[
                    { key: "partnerLanguage", label: "Your spouse or common-law partner has a language level in either English or French at CLB 4 level or higher in all 4 language abilities (speaking, listening, reading and writing).", pts: 5 },
                    { key: "studyInCanada", label: "You completed at least two academic years of full-time study (in a program at least two years long) at a secondary or post-secondary institution in Canada.", pts: 5 },
                    { key: "partnerStudyInCanada", label: "Your spouse or common-law partner completed at least two academic years of full-time study (in a program at least two years long) at a secondary or post-secondary institution in Canada.", pts: 5 },
                    { key: "workInCanada", label: "You completed at least one year of full-time work in Canada on a valid work permit in a skilled trade (NOC 0, A, B).", pts: 10 },
                    { key: "partnerWorkInCanada", label: "Your spouse or common-law partner completed at least one year of full-time work in Canada on a valid work permit.", pts: 5 },
                    { key: "arrangedEmployment", label: "You earned points under Factor 5: Arranged Employment.", pts: 5 },
                    { key: "relativeInCanada", label: "You, or your spouse or common-law partner, have a relative who is living in Canada and is 18 years or older and is a Canadian citizen or permanent resident.", pts: 5 },
                ].map((opt) => (
                    <label key={opt.key} className={`block p-4 rounded-lg border cursor-pointer transition-all ${formData.adaptability[opt.key as keyof typeof formData.adaptability] ? 'bg-blue-50 border-primary ring-1 ring-primary' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                        <div className="flex items-start">
                            <input 
                                type="checkbox" 
                                className="w-5 h-5 mt-1 text-primary border-gray-300 rounded focus:ring-primary"
                                checked={formData.adaptability[opt.key as keyof typeof formData.adaptability]}
                                onChange={(e) => setFormData({...formData, adaptability: {...formData.adaptability, [opt.key]: e.target.checked}})}
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
                    <div className={`mt-8 p-8 rounded-2xl text-center border-2 ${points >= 67 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                        <p className="text-gray-600 text-lg font-medium mb-2">Total Points Awarded</p>
                        <div className="flex items-baseline justify-center gap-2 mb-4">
                             <span className={`text-6xl font-extrabold ${points >= 67 ? 'text-green-600' : 'text-red-500'}`}>
                                {points}
                            </span>
                            <span className="text-3xl text-gray-400 font-bold">/ 100</span>
                        </div>
                       
                        <div className="h-px w-full bg-black/10 my-6"></div>
                        
                        <p className={`text-2xl font-bold mb-2 ${points >= 67 ? 'text-green-700' : 'text-red-700'}`}>
                            {points >= 67 
                                ? "Eligible for Federal Skilled Worker Program" 
                                : "Not Eligible"}
                        </p>
                        <p className="text-gray-600 max-w-lg mx-auto">
                             {points >= 67 
                                ? "Great news! You meet the minimum 67-point requirement. We recommend booking a consultation to discuss your next steps." 
                                : "You currently do not meet the 67-point requirement. Consider improving your language scores or gaining more work experience."}
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

      </div>
    </div>
  );
};
