"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export const AustraliaPRCalculator = () => {
  const router = useRouter();
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
      "competent": 0,    // IELTS 6
      "proficient": 10,  // IELTS 7
      "superior": 20     // IELTS 8
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
    
    // Calculate raw work points
    const overseasPoints = expOverseasMap[formData.experienceOverseas] || 0;
    const ausPoints = expAusMap[formData.experienceAus] || 0;
    
    // Total work points capped at 20
    total += Math.min(overseasPoints + ausPoints, 20);

    // 4. Education (Max 20)
    const eduMap: Record<string, number> = {
      "doctorate": 20,
      "bachelors": 15, // Bachelors or Masters
      "diploma": 10,   // Trade qual or Diploma
      "none": 0
    };
    total += eduMap[formData.education] || 0;

    // 5. Study in Australia (5)
    if (formData.studyInAus) total += 5;

    // 6. Specialist Education (STEM Masters/PhD by research) (10)
    if (formData.specialistEdu) total += 10;
    
    // 7. Regional Study (5)
    if (formData.regionalStudy) total += 5;

    // 8. Partner Skills (Max 10)
    const partnerMap: Record<string, number> = {
      "none": 0,
      "competent_english": 5,
      "skilled_partner": 10, // Competent English + Skills Assessment
      "single": 10
    };
    total += partnerMap[formData.partnerSkills] || 0;

    // 9. Nomination (State/Territory)
    const nominationMap: Record<string, number> = {
      "none": 0,
      "190": 5,   // State Nomination (190)
      "491": 15   // Regional Nomination (491)
    };
    total += nominationMap[formData.nomination] || 0;

    setPoints(total);
    setShowResult(true);
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl max-w-4xl mx-auto border border-gray-100">
      <h3 className="text-2xl font-bold text-primary mb-6 border-b pb-4">Australia PR Points Calculator</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Age */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Age Band</label>
          <select 
            className="w-full p-3 border rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-primary/20"
            value={formData.age}
            onChange={(e) => setFormData({...formData, age: e.target.value})}
          >
            <option value="18-24">18-24 years (25 pts)</option>
            <option value="25-32">25-32 years (30 pts)</option>
            <option value="33-39">33-39 years (25 pts)</option>
            <option value="40-44">40-44 years (15 pts)</option>
            <option value="45+">45 or older (0 pts)</option>
          </select>
        </div>

        {/* English */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">English Proficiency</label>
          <select 
            className="w-full p-3 border rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-primary/20"
            value={formData.english}
            onChange={(e) => setFormData({...formData, english: e.target.value})}
          >
            <option value="competent">Competent (IELTS 6+) (0 pts)</option>
            <option value="proficient">Proficient (IELTS 7+) (10 pts)</option>
            <option value="superior">Superior (IELTS 8+) (20 pts)</option>
          </select>
        </div>

        {/* Education */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Education</label>
          <select 
            className="w-full p-3 border rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-primary/20"
            value={formData.education}
            onChange={(e) => setFormData({...formData, education: e.target.value})}
          >
            <option value="doctorate">Doctorate (20 pts)</option>
            <option value="bachelors">Bachelor&apos;s / Master&apos;s (15 pts)</option>
            <option value="diploma">Diploma / Trade (10 pts)</option>
            <option value="none">Below Diploma (0 pts)</option>
          </select>
        </div>

        {/* Partner Skills */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Marital Status / Partner Skills</label>
          <select 
            className="w-full p-3 border rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-primary/20"
            value={formData.partnerSkills}
            onChange={(e) => setFormData({...formData, partnerSkills: e.target.value})}
          >
            <option value="none">Partner (No points)</option>
            <option value="competent_english">Partner with Competent English (5 pts)</option>
            <option value="skilled_partner">Partner with Skills Assessment (10 pts)</option>
            <option value="single">Single (10 pts)</option>
          </select>
        </div>

        {/* Overseas Experience */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Overseas Skilled Experience</label>
          <select 
            className="w-full p-3 border rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-primary/20"
            value={formData.experienceOverseas}
            onChange={(e) => setFormData({...formData, experienceOverseas: e.target.value})}
          >
            <option value="none">Less than 3 years</option>
            <option value="3-4">3-4 years (5 pts)</option>
            <option value="5-7">5-7 years (10 pts)</option>
            <option value="8+">8+ years (15 pts)</option>
          </select>
        </div>

        {/* Australian Experience */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Australian Skilled Experience</label>
          <select 
            className="w-full p-3 border rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-primary/20"
            value={formData.experienceAus}
            onChange={(e) => setFormData({...formData, experienceAus: e.target.value})}
          >
            <option value="none">Less than 1 year</option>
            <option value="1-2">1-2 years (5 pts)</option>
            <option value="3-4">3-4 years (10 pts)</option>
            <option value="5-7">5-7 years (15 pts)</option>
            <option value="8+">8+ years (20 pts)</option>
          </select>
        </div>
      </div>

      {/* Checkboxes */}
      <div className="mt-8 bg-gray-50 p-6 rounded-xl border border-gray-200 grid md:grid-cols-2 gap-4">
        <label className="flex items-center space-x-3 cursor-pointer">
            <input 
                type="checkbox" 
                className="w-5 h-5 text-primary rounded focus:ring-primary"
                checked={formData.studyInAus}
                onChange={(e) => setFormData({...formData, studyInAus: e.target.checked})}
            />
            <span className="text-sm text-gray-700">2 Years Study in Australia (+5 pts)</span>
        </label>
        <label className="flex items-center space-x-3 cursor-pointer">
            <input 
                type="checkbox" 
                className="w-5 h-5 text-primary rounded focus:ring-primary"
                checked={formData.regionalStudy}
                onChange={(e) => setFormData({...formData, regionalStudy: e.target.checked})}
            />
            <span className="text-sm text-gray-700">Regional Study (+5 pts)</span>
        </label>
        <label className="flex items-center space-x-3 cursor-pointer">
            <input 
                type="checkbox" 
                className="w-5 h-5 text-primary rounded focus:ring-primary"
                checked={formData.specialistEdu}
                onChange={(e) => setFormData({...formData, specialistEdu: e.target.checked})}
            />
            <span className="text-sm text-gray-700">STEM Specialist Qualification (+10 pts)</span>
        </label>
      </div>
      
      {/* Nomination */}
      <div className="mt-6 space-y-2">
          <label className="text-sm font-semibold text-gray-700">State / Territory Nomination</label>
          <select 
            className="w-full p-3 border rounded-lg bg-blue-50 outline-none focus:ring-2 focus:ring-blue-200"
            value={formData.nomination}
            onChange={(e) => setFormData({...formData, nomination: e.target.value})}
          >
            <option value="none">No Nomination (189 Visa)</option>
            <option value="190">State Nomination (Subclass 190) (+5 pts)</option>
            <option value="491">Regional Nomination (Subclass 491) (+15 pts)</option>
          </select>
      </div>

      <div className="mt-8 flex flex-col items-center gap-4">
        <Button 
            onClick={calculatePoints}
            size="lg"
            className="w-full md:w-auto px-12 py-4 font-bold shadow-lg"
        >
            Calculate Points
        </Button>
        <Button 
            onClick={() => router.push('/calculators/australia-pr')}
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
            className={`mt-8 p-6 rounded-xl text-center border-2 ${points >= 65 ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'}`}
        >
            <p className="text-gray-600 font-medium mb-1">Total Points</p>
            <div className={`text-5xl font-bold mb-3 ${points >= 65 ? 'text-green-600' : 'text-orange-500'}`}>
                {points}
            </div>
            <p className={`text-lg font-semibold ${points >= 65 ? 'text-green-700' : 'text-orange-700'}`}>
                {points >= 65 
                    ? "You meet the minimum 65 points requirement!" 
                    : "You are below the 65 points threshold."}
            </p>
            {points >= 65 && (
                <p className="text-sm text-green-600 mt-2">
                    *Note: Invitations often require higher scores depending on occupation.
                </p>
            )}
        </motion.div>
      )}
    </div>
  );
};
