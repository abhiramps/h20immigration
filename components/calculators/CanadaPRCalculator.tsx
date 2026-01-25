"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export const CanadaPRCalculator = () => {
  const router = useRouter();
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
    secondLanguage: "none",
    arrangedEmployment: "no",
    adaptability: {
      partnerLanguage: false,
      studyInCanada: false,
      partnerStudyInCanada: false,
      workInCanada: false,
      partnerWorkInCanada: false,
      relativeInCanada: false,
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

    // 4. Language Skills (Max 28 - First Official Language Max 24)
    // Simplified logic: Assuming IELTS scores mapping roughly to points per skill based on CLB 9 target
    // CLB 9: L8, R7, W7, S7 => 6 points per skill (Max 24)
    // We will use a simplified mapper for the prototype based on CLB levels roughly.
    // Real calculation requires complex CLB mapping. We'll approximate for "Proficient" vs "Basic".
    
    // Helper to get CLB approx points (simplified for FSW 67 grid which uses CLB 9=6pts/skill, CLB 8=5, CLB 7=4 (min for FSW))
    const getLangPoints = (clb: number) => {
        if (clb >= 9) return 6;
        if (clb === 8) return 5;
        if (clb === 7) return 4; // Minimum for FSW eligibility is CLB 7 in all 4
        return 0; 
    };

    // Very rough IELTS to CLB map for calculation
    // CLB 9: R7, W7, L8, S7
    // CLB 8: R6.5, W6.5, L7.5, S6.5
    // CLB 7: R6, W6, L6, S6
    
    // We'll treat the input values as "approximate CLB" for simplicity in this prototype, 
    // or better, map the dropdowns to points directly.
    // Let's assume the user selected IELTS Band for simplicity:
    
    const calcIELTSPoints = (type: 'R'|'W'|'L'|'S', score: number) => {
         // CLB 9 check
         if (
            (type === 'R' && score >= 7) ||
            (type === 'W' && score >= 7) ||
            (type === 'L' && score >= 8) ||
            (type === 'S' && score >= 7)
         ) return 6;
         // CLB 8 check
         if (
            (type === 'R' && score >= 6.5) ||
            (type === 'W' && score >= 6.5) ||
            (type === 'L' && score >= 7.5) ||
            (type === 'S' && score >= 6.5)
         ) return 5;
         // CLB 7 check
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
    if (formData.arrangedEmployment === "yes") total += 10;

    // 6. Adaptability (Max 10)
    let adaptPoints = 0;
    if (formData.adaptability.partnerLanguage) adaptPoints += 5;
    if (formData.adaptability.studyInCanada) adaptPoints += 5;
    if (formData.adaptability.partnerStudyInCanada) adaptPoints += 5;
    if (formData.adaptability.workInCanada) adaptPoints += 10;
    if (formData.adaptability.partnerWorkInCanada) adaptPoints += 5;
    if (formData.adaptability.relativeInCanada) adaptPoints += 5;
    
    total += Math.min(adaptPoints, 10);

    setPoints(total);
    setShowResult(true);
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl max-w-4xl mx-auto border border-gray-100">
      <h3 className="text-2xl font-bold text-primary mb-6 border-b pb-4">Canada FSW (67 Points) Calculator</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Age */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Age</label>
          <select 
            className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            value={formData.age}
            onChange={(e) => setFormData({...formData, age: e.target.value})}
          >
            <option value="under18">Under 18</option>
            <option value="18-35">18 - 35 (12 pts)</option>
            {[...Array(12)].map((_, i) => (
               <option key={i} value={(36+i).toString()}>{36+i} ({11-i} pts)</option>
            ))}
            <option value="47+">47 or older (0 pts)</option>
          </select>
        </div>

        {/* Education */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Education</label>
          <select 
            className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            value={formData.education}
            onChange={(e) => setFormData({...formData, education: e.target.value})}
          >
            <option value="phd">Doctoral (PhD) (25 pts)</option>
            <option value="masters">Master&apos;s Degree (23 pts)</option>
            <option value="two_degrees">Two or more degrees (22 pts)</option>
            <option value="bachelors_3y">Bachelor&apos;s (3+ years) (21 pts)</option>
            <option value="diploma_2y">Diploma (2 years) (19 pts)</option>
            <option value="diploma_1y">Diploma (1 year) (15 pts)</option>
            <option value="highschool">High School (5 pts)</option>
          </select>
        </div>

        {/* Experience */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Skilled Work Experience</label>
          <select 
            className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            value={formData.experience}
            onChange={(e) => setFormData({...formData, experience: e.target.value})}
          >
            <option value="1">1 Year (9 pts)</option>
            <option value="2-3">2-3 Years (11 pts)</option>
            <option value="4-5">4-5 Years (13 pts)</option>
            <option value="6+">6 or more Years (15 pts)</option>
          </select>
        </div>

        {/* Arranged Employment */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Arranged Employment in Canada?</label>
          <select 
            className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            value={formData.arrangedEmployment}
            onChange={(e) => setFormData({...formData, arrangedEmployment: e.target.value})}
          >
            <option value="no">No</option>
            <option value="yes">Yes (10 pts)</option>
          </select>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
            <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2 text-sm">EN</span>
            Language Proficiency (IELTS General)
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {['Reading', 'Writing', 'Listening', 'Speaking'].map((skill) => (
                 <div key={skill} className="space-y-1">
                     <label className="text-xs font-medium text-gray-500 uppercase">{skill}</label>
                     <select 
                        className="w-full p-2 border rounded bg-gray-50 text-sm"
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
      </div>

      <div className="mt-8 bg-gray-50 p-6 rounded-xl border border-gray-200">
        <h4 className="font-semibold text-gray-800 mb-4">Adaptability Factors (Max 10 Points)</h4>
        <div className="grid md:grid-cols-2 gap-4">
            <label className="flex items-center space-x-3 cursor-pointer hover:bg-white p-2 rounded transition-colors">
                <input 
                    type="checkbox" 
                    className="w-5 h-5 text-primary rounded border-gray-300 focus:ring-primary"
                    checked={formData.adaptability.relativeInCanada}
                    onChange={(e) => setFormData({...formData, adaptability: {...formData.adaptability, relativeInCanada: e.target.checked}})}
                />
                <span className="text-sm text-gray-700">Relative in Canada (18+ Citizen/PR)</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer hover:bg-white p-2 rounded transition-colors">
                <input 
                    type="checkbox" 
                    className="w-5 h-5 text-primary rounded border-gray-300 focus:ring-primary"
                    checked={formData.adaptability.partnerLanguage}
                    onChange={(e) => setFormData({...formData, adaptability: {...formData.adaptability, partnerLanguage: e.target.checked}})}
                />
                <span className="text-sm text-gray-700">Spouse has CLB 4+ English</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer hover:bg-white p-2 rounded transition-colors">
                <input 
                    type="checkbox" 
                    className="w-5 h-5 text-primary rounded border-gray-300 focus:ring-primary"
                    checked={formData.adaptability.workInCanada}
                    onChange={(e) => setFormData({...formData, adaptability: {...formData.adaptability, workInCanada: e.target.checked}})}
                />
                <span className="text-sm text-gray-700">1 Yr+ Work in Canada</span>
            </label>
             <label className="flex items-center space-x-3 cursor-pointer hover:bg-white p-2 rounded transition-colors">
                <input 
                    type="checkbox" 
                    className="w-5 h-5 text-primary rounded border-gray-300 focus:ring-primary"
                    checked={formData.adaptability.studyInCanada}
                    onChange={(e) => setFormData({...formData, adaptability: {...formData.adaptability, studyInCanada: e.target.checked}})}
                />
                <span className="text-sm text-gray-700">2 Yrs+ Study in Canada</span>
            </label>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-4">
        <Button 
            onClick={calculatePoints}
            size="lg"
            className="w-full md:w-auto px-12 py-4 text-lg font-bold shadow-lg shadow-primary/30"
        >
            Calculate Eligibility
        </Button>
        <Button 
            onClick={() => router.push('/calculators/canada-pr')}
            variant="secondary"
            size="lg"
            className="w-full md:w-auto px-12 py-4 text-lg font-bold shadow-lg"
        >
            Switch to Advanced Calculator
        </Button>
      </div>

      {showResult && (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-8 p-6 rounded-xl text-center border-2 ${points >= 67 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}
        >
            <p className="text-gray-600 font-medium mb-1">Your Score</p>
            <div className={`text-5xl font-bold mb-3 ${points >= 67 ? 'text-green-600' : 'text-red-500'}`}>
                {points} <span className="text-2xl text-gray-400">/ 100</span>
            </div>
            <p className={`text-lg font-semibold ${points >= 67 ? 'text-green-700' : 'text-red-700'}`}>
                {points >= 67 
                    ? "Congratulations! You are eligible for the FSW Program." 
                    : "You currently do not meet the 67-point requirement."}
            </p>
        </motion.div>
      )}
    </div>
  );
};
