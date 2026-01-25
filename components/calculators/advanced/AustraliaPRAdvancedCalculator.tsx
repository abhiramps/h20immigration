"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";

export const AustraliaPRAdvancedCalculator = () => {
  const [points, setPoints] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const [formData, setFormData] = useState({
    age: "25-32",
    english: "proficient",
    experienceOverseas: "none",
    experienceAus: "none",
    education: "bachelors",
    studyInAus: false,
    specialistEdu: false,
    regionalStudy: false,
    communityLanguage: false,
    professionalYear: false,
    partnerSkills: "none",
    nomination: "none"
  });

  const calculatePoints = () => {
    let total = 0;

    // 1. Age (Max 30)
    const ageMap: Record<string, number> = {
      "18-24": 25,
      "25-32": 30,
      "33-39": 25,
      "40-44": 15,
      "45+": 0
    };
    total += ageMap[formData.age] || 0;

    // 2. English (Max 20)
    const englishMap: Record<string, number> = {
      "competent": 0,    
      "proficient": 10,  
      "superior": 20     
    };
    total += englishMap[formData.english] || 0;

    // 3. Employment (Max 20 total combined)
    const expOverseasMap: Record<string, number> = {
      "none": 0,
      "3-4": 5,
      "5-7": 10,
      "8+": 15
    };
    const expAusMap: Record<string, number> = {
      "none": 0,
      "1-2": 5,
      "3-4": 10,
      "5-7": 15,
      "8+": 20
    };
    
    const overseasPoints = expOverseasMap[formData.experienceOverseas] || 0;
    const ausPoints = expAusMap[formData.experienceAus] || 0;
    
    total += Math.min(overseasPoints + ausPoints, 20);

    // 4. Education (Max 20)
    const eduMap: Record<string, number> = {
      "doctorate": 20,
      "bachelors": 15, 
      "diploma": 10,   
      "award": 10,
      "none": 0
    };
    total += eduMap[formData.education] || 0;

    // 5. Australian Study Requirement (5)
    if (formData.studyInAus) total += 5;

    // 6. Specialist Education (10)
    if (formData.specialistEdu) total += 10;
    
    // 7. Regional Study (5)
    if (formData.regionalStudy) total += 5;

    // 8. Community Language (5)
    if (formData.communityLanguage) total += 5;

    // 9. Professional Year (5)
    if (formData.professionalYear) total += 5;

    // 10. Partner Skills (Max 10)
    const partnerMap: Record<string, number> = {
      "none": 0,
      "competent_english": 5,
      "skilled_partner": 10, 
      "single": 10
    };
    total += partnerMap[formData.partnerSkills] || 0;

    // 11. Nomination
    const nominationMap: Record<string, number> = {
      "none": 0,
      "190": 5,   
      "491": 15   
    };
    total += nominationMap[formData.nomination] || 0;

    setPoints(total);
    setShowResult(true);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 md:p-8 bg-gradient-to-r from-primary/5 to-transparent border-b border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900">Australia PR Points Calculator (Subclass 189, 190, 491)</h1>
          <p className="text-gray-600 mt-2">
            Calculate your points for the Australian General Skilled Migration program. A minimum of 65 points is required to be eligible.
          </p>
      </div>
      
      <div className="p-6 md:p-8 space-y-10">
        
        {/* 1. Age */}
        <section>
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3 text-sm">1</span>
                Age (Maximum 30 Points)
            </h3>
            <div className="pl-11 max-w-md">
                <select 
                    className="w-full p-4 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-primary/20 outline-none font-medium text-gray-700"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                >
                    <option value="18-24">18 - 24 years (25 Points)</option>
                    <option value="25-32">25 - 32 years (30 Points)</option>
                    <option value="33-39">33 - 39 years (25 Points)</option>
                    <option value="40-44">40 - 44 years (15 Points)</option>
                    <option value="45+">45 years or older (0 Points)</option>
                </select>
            </div>
        </section>

        {/* 2. English */}
        <section>
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3 text-sm">2</span>
                English Language Ability (Maximum 20 Points)
            </h3>
            <div className="space-y-3 pl-11">
                {[
                    { val: "competent", label: "Competent English (IELTS 6 / PTE 50 in each band)", pts: 0 },
                    { val: "proficient", label: "Proficient English (IELTS 7 / PTE 65 in each band)", pts: 10 },
                    { val: "superior", label: "Superior English (IELTS 8 / PTE 79 in each band)", pts: 20 },
                ].map((opt) => (
                    <label key={opt.val} className={`block p-4 rounded-lg border cursor-pointer transition-all ${formData.english === opt.val ? 'bg-blue-50 border-primary ring-1 ring-primary' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                        <div className="flex items-center">
                            <input 
                                type="radio" 
                                name="english"
                                className="w-5 h-5 text-primary border-gray-300 focus:ring-primary"
                                checked={formData.english === opt.val}
                                onChange={() => setFormData({...formData, english: opt.val})}
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

        {/* 3. Overseas Experience */}
        <section>
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3 text-sm">3</span>
                Overseas Skilled Employment (Outside Australia - Last 10 Years)
            </h3>
            <div className="space-y-3 pl-11">
                {[
                    { val: "none", label: "Less than 3 years", pts: 0 },
                    { val: "3-4", label: "3 - 4 years", pts: 5 },
                    { val: "5-7", label: "5 - 7 years", pts: 10 },
                    { val: "8+", label: "8 years or more", pts: 15 },
                ].map((opt) => (
                    <label key={opt.val} className={`block p-4 rounded-lg border cursor-pointer transition-all ${formData.experienceOverseas === opt.val ? 'bg-blue-50 border-primary ring-1 ring-primary' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                        <div className="flex items-center">
                            <input 
                                type="radio" 
                                name="experienceOverseas"
                                className="w-5 h-5 text-primary border-gray-300 focus:ring-primary"
                                checked={formData.experienceOverseas === opt.val}
                                onChange={() => setFormData({...formData, experienceOverseas: opt.val})}
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

        {/* 4. Australian Experience */}
        <section>
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3 text-sm">4</span>
                Australian Skilled Employment (In Australia - Last 10 Years)
            </h3>
            <div className="space-y-3 pl-11">
                {[
                    { val: "none", label: "Less than 1 year", pts: 0 },
                    { val: "1-2", label: "1 - 2 years", pts: 5 },
                    { val: "3-4", label: "3 - 4 years", pts: 10 },
                    { val: "5-7", label: "5 - 7 years", pts: 15 },
                    { val: "8+", label: "8 years or more", pts: 20 },
                ].map((opt) => (
                    <label key={opt.val} className={`block p-4 rounded-lg border cursor-pointer transition-all ${formData.experienceAus === opt.val ? 'bg-blue-50 border-primary ring-1 ring-primary' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                        <div className="flex items-center">
                            <input 
                                type="radio" 
                                name="experienceAus"
                                className="w-5 h-5 text-primary border-gray-300 focus:ring-primary"
                                checked={formData.experienceAus === opt.val}
                                onChange={() => setFormData({...formData, experienceAus: opt.val})}
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

        {/* 5. Education */}
        <section>
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3 text-sm">5</span>
                Educational Qualifications (Maximum 20 Points)
            </h3>
            <div className="space-y-3 pl-11">
                {[
                    { val: "doctorate", label: "Doctorate from an Australian educational institution or other recognized standard", pts: 20 },
                    { val: "bachelors", label: "At least a Bachelor degree from an Australian educational institution or other recognized standard", pts: 15 },
                    { val: "diploma", label: "Diploma or trade qualification from an Australian educational institution", pts: 10 },
                    { val: "award", label: "Attained a qualification or award recognized by the relevant assessing authority for your nominated skilled occupation as being suitable for that occupation", pts: 10 },
                    { val: "none", label: "Other / None of the above", pts: 0 },
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

        {/* 6. Partner Skills */}
        <section>
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3 text-sm">6</span>
                Partner Skills (Maximum 10 Points)
            </h3>
            <div className="space-y-3 pl-11">
                {[
                    { val: "single", label: "Single (No spouse or de facto partner) or your partner is an Australian citizen or PR", pts: 10 },
                    { val: "skilled_partner", label: "Partner is under 45, has Competent English, and has a suitable Skills Assessment in a skilled occupation on the same list as yours", pts: 10 },
                    { val: "competent_english", label: "Partner has Competent English", pts: 5 },
                    { val: "none", label: "Partner is not an Australian PR/citizen and does not meet the above criteria", pts: 0 },
                ].map((opt) => (
                    <label key={opt.val} className={`block p-4 rounded-lg border cursor-pointer transition-all ${formData.partnerSkills === opt.val ? 'bg-blue-50 border-primary ring-1 ring-primary' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                        <div className="flex items-center">
                            <input 
                                type="radio" 
                                name="partnerSkills"
                                className="w-5 h-5 text-primary border-gray-300 focus:ring-primary"
                                checked={formData.partnerSkills === opt.val}
                                onChange={() => setFormData({...formData, partnerSkills: opt.val})}
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

         {/* 7. Other Factors */}
         <section>
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3 text-sm">7</span>
                Additional Factors
            </h3>
            <div className="space-y-3 pl-11">
                {[
                    { key: "studyInAus", label: "Australian Study Requirement: At least one degree, diploma or trade qualification from an Australian educational institution that took at least 2 years of full-time study.", pts: 5 },
                    { key: "specialistEdu", label: "Specialist Education Qualification: A Masters degree by research or a Doctorate degree from an Australian educational institution that included at least 2 academic years study in a relevant STEM field.", pts: 10 },
                    { key: "regionalStudy", label: "Study in regional Australia: You have at least one degree, diploma or trade qualification from an Australian educational institution that satisfies the Australian study requirement obtained while living and studying in an eligible area of regional Australia.", pts: 5 },
                    { key: "professionalYear", label: "Professional Year in Australia: You completed a Professional Year in Australia in your nominated skilled occupation for at least 12 months in the 48 months before you were invited to apply.", pts: 5 },
                    { key: "communityLanguage", label: "Credentialled Community Language: You have been accredited at the paraprofessional level or higher, hold a certification for a credentialled community language.", pts: 5 },
                ].map((opt) => (
                    <label key={opt.key} className={`block p-4 rounded-lg border cursor-pointer transition-all ${formData[opt.key as keyof typeof formData] ? 'bg-blue-50 border-primary ring-1 ring-primary' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                        <div className="flex items-start">
                            <input 
                                type="checkbox" 
                                className="w-5 h-5 mt-1 text-primary border-gray-300 rounded focus:ring-primary"
                                checked={formData[opt.key as keyof typeof formData] as boolean}
                                onChange={(e) => setFormData({...formData, [opt.key]: e.target.checked})}
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

        {/* 8. Nomination */}
        <section>
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3 text-sm">8</span>
                Nomination or Sponsorship
            </h3>
            <div className="space-y-3 pl-11">
                {[
                    { val: "none", label: "None (Skilled Independent - Subclass 189)", pts: 0 },
                    { val: "190", label: "Nomination by state or territory government (visa subclass 190)", pts: 5 },
                    { val: "491", label: "Nomination by state or territory government or sponsorship by an eligible family member to reside in a designated regional area (visa subclass 491)", pts: 15 },
                ].map((opt) => (
                    <label key={opt.val} className={`block p-4 rounded-lg border cursor-pointer transition-all ${formData.nomination === opt.val ? 'bg-blue-50 border-primary ring-1 ring-primary' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                        <div className="flex items-center">
                            <input 
                                type="radio" 
                                name="nomination"
                                className="w-5 h-5 text-primary border-gray-300 focus:ring-primary"
                                checked={formData.nomination === opt.val}
                                onChange={() => setFormData({...formData, nomination: opt.val})}
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
                    <div className={`mt-8 p-8 rounded-2xl text-center border-2 ${points >= 65 ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'}`}>
                        <p className="text-gray-600 text-lg font-medium mb-2">Total Points Awarded</p>
                        <div className="flex items-baseline justify-center gap-2 mb-4">
                             <span className={`text-6xl font-extrabold ${points >= 65 ? 'text-green-600' : 'text-orange-500'}`}>
                                {points}
                            </span>
                        </div>
                       
                        <div className="h-px w-full bg-black/10 my-6"></div>
                        
                        <p className={`text-2xl font-bold mb-2 ${points >= 65 ? 'text-green-700' : 'text-orange-700'}`}>
                            {points >= 65 
                                ? "You meet the minimum 65 points requirement!" 
                                : "You are below the 65 points threshold."}
                        </p>
                        <p className="text-gray-600 max-w-lg mx-auto">
                             {points >= 65 
                                ? "Great job! You are eligible to submit an Expression of Interest (EOI). Note that some competitive occupations may require higher points." 
                                : "You currently do not meet the minimum requirement. Consider improving your English score or gaining more experience."}
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

      </div>
    </div>
  );
};
