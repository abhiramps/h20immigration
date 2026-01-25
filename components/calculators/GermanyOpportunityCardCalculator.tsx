"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

export const GermanyOpportunityCardCalculator = () => {
  const [points, setPoints] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const [formData, setFormData] = useState({
    partialRecognition: false,
    shortageOccupation: false,
    experience: "none", // none, 2y, 5y
    german: "none", // none, A2, B1, B2
    english: "none", // none, C1
    age: "under35", // under35, 35-40, over40
    stayInGermany: false,
    partner: false,
  });

  const calculatePoints = () => {
    let total = 0;

    // 1. Partial Recognition (4 pts)
    if (formData.partialRecognition) total += 4;

    // 2. Shortage Occupation (1 pt)
    if (formData.shortageOccupation) total += 1;

    // 3. Work Experience
    if (formData.experience === "5y") total += 3;
    else if (formData.experience === "2y") total += 2;

    // 4. Language
    // German
    if (formData.german === "B2") total += 3;
    else if (formData.german === "B1") total += 2;
    else if (formData.german === "A2") total += 1;

    // English (C1 = 1 pt)
    if (formData.english === "C1") total += 1;

    // 5. Age
    if (formData.age === "under35") total += 2;
    else if (formData.age === "35-40") total += 1;

    // 6. Connection to Germany (1 pt)
    if (formData.stayInGermany) total += 1;

    // 7. Partner Application (1 pt)
    if (formData.partner) total += 1;

    setPoints(total);
    setShowResult(true);
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl max-w-4xl mx-auto border border-gray-100">
      <h3 className="text-2xl font-bold text-primary mb-6 border-b pb-4">Germany Opportunity Card Calculator</h3>
      <p className="mb-6 text-sm text-gray-600 bg-blue-50 p-4 rounded-lg">
        <strong>Prerequisites:</strong> You must have at least 2 years of vocational training/degree recognized in country of origin AND (A1 German OR B2 English).
      </p>

      <div className="space-y-6">
        
        {/* Partial Recognition */}
        <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <div>
                <p className="font-semibold text-gray-800">Partial Recognition of Qualification</p>
                <p className="text-sm text-gray-500">Is your foreign qualification partially recognized in Germany?</p>
            </div>
            <input 
                type="checkbox" 
                className="w-6 h-6 text-primary rounded focus:ring-primary"
                checked={formData.partialRecognition}
                onChange={(e) => setFormData({...formData, partialRecognition: e.target.checked})}
            />
        </div>

        {/* Shortage */}
        <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <div>
                <p className="font-semibold text-gray-800">Shortage Occupation</p>
                <p className="text-sm text-gray-500">Is your qualification in a shortage occupation?</p>
            </div>
            <input 
                type="checkbox" 
                className="w-6 h-6 text-primary rounded focus:ring-primary"
                checked={formData.shortageOccupation}
                onChange={(e) => setFormData({...formData, shortageOccupation: e.target.checked})}
            />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
            {/* Experience */}
            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Professional Experience (Last 5-7 years)</label>
                <select 
                    className="w-full p-3 border rounded-lg bg-gray-50"
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                >
                    <option value="none">Less than 2 years</option>
                    <option value="2y">At least 2 years (2 pts)</option>
                    <option value="5y">At least 5 years (3 pts)</option>
                </select>
            </div>

            {/* Age */}
            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Age</label>
                <select 
                    className="w-full p-3 border rounded-lg bg-gray-50"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                >
                    <option value="under35">Under 35 years (2 pts)</option>
                    <option value="35-40">35 - 40 years (1 pt)</option>
                    <option value="over40">Over 40 years (0 pts)</option>
                </select>
            </div>

            {/* German */}
            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">German Level</label>
                <select 
                    className="w-full p-3 border rounded-lg bg-gray-50"
                    value={formData.german}
                    onChange={(e) => setFormData({...formData, german: e.target.value})}
                >
                    <option value="none">Below A2</option>
                    <option value="A2">A2 (1 pt)</option>
                    <option value="B1">B1 (2 pts)</option>
                    <option value="B2">B2 or higher (3 pts)</option>
                </select>
            </div>

            {/* English */}
            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">English Level</label>
                <select 
                    className="w-full p-3 border rounded-lg bg-gray-50"
                    value={formData.english}
                    onChange={(e) => setFormData({...formData, english: e.target.value})}
                >
                    <option value="none">Below C1</option>
                    <option value="C1">C1 or Native (1 pt)</option>
                </select>
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 pt-2">
            <div className="flex items-center space-x-3 p-4 border rounded-lg bg-gray-50">
                <input 
                    type="checkbox" 
                    className="w-5 h-5 text-primary rounded"
                    checked={formData.stayInGermany}
                    onChange={(e) => setFormData({...formData, stayInGermany: e.target.checked})}
                />
                <span className="text-sm text-gray-800">Stayed in Germany 6+ months (last 5 yrs)</span>
            </div>
            <div className="flex items-center space-x-3 p-4 border rounded-lg bg-gray-50">
                <input 
                    type="checkbox" 
                    className="w-5 h-5 text-primary rounded"
                    checked={formData.partner}
                    onChange={(e) => setFormData({...formData, partner: e.target.checked})}
                />
                <span className="text-sm text-gray-800">Applying with Partner (Joint Application)</span>
            </div>
        </div>

        <div className="mt-8 flex justify-center">
            <Button onClick={calculatePoints} size="lg" className="w-full md:w-auto px-12 py-4 shadow-lg">
                Check Eligibility
            </Button>
        </div>

        {showResult && (
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-8 p-6 rounded-xl text-center border-2 ${points >= 6 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}
            >
                <p className="text-gray-600 font-medium mb-1">Total Points</p>
                <div className={`text-5xl font-bold mb-3 ${points >= 6 ? 'text-green-600' : 'text-red-500'}`}>
                    {points} <span className="text-xl text-gray-400">/ 6 required</span>
                </div>
                <p className={`text-lg font-semibold ${points >= 6 ? 'text-green-700' : 'text-red-700'}`}>
                    {points >= 6 
                        ? "You are eligible for the Opportunity Card!" 
                        : "You need at least 6 points to qualify."}
                </p>
            </motion.div>
        )}
      </div>
    </div>
  );
};
