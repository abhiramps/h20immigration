"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

export const SaskatchewanPNPCalculator = () => {
  const [points, setPoints] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const [formData, setFormData] = useState({
    education: "masters",
    experience5y: "5", // Experience in last 5 years
    experience6to10y: "5", // Experience in 6-10 years prior
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
      "bachelors": 20, // 3y+ degree
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
    
    // Logic note: Some categories are exclusive or capped. 
    // Usually Employment Offer is its own stream, but relative/work/student are mainly for Occupation In-Demand/Express Entry.
    // We will just sum them up to a max of 30 for simplicity as per general grid behavior, 
    // though typically you only claim one main connection type per application stream.
    total += Math.min(connPoints, 30);

    setPoints(total);
    setShowResult(true);
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl max-w-4xl mx-auto border border-gray-100">
      <h3 className="text-2xl font-bold text-primary mb-6 border-b pb-4">Saskatchewan (SINP) Point Calculator</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Education */}
        <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Education</label>
            <select 
                className="w-full p-3 border rounded-lg bg-gray-50"
                value={formData.education}
                onChange={(e) => setFormData({...formData, education: e.target.value})}
            >
                <option value="masters">Master&apos;s / PhD (23 pts)</option>
                <option value="bachelors">Bachelor&apos;s / 3y+ Degree (20 pts)</option>
                <option value="trade">Trade Certification (Journeyperson) (20 pts)</option>
                <option value="diploma_2y">Diploma (2 years) (15 pts)</option>
                <option value="diploma_1y">Diploma (1 year) (12 pts)</option>
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
                <option value="18-21">18 - 21 (8 pts)</option>
                <option value="22-34">22 - 34 (12 pts)</option>
                <option value="35-45">35 - 45 (10 pts)</option>
                <option value="46-50">46 - 50 (8 pts)</option>
                <option value="other">50+ or under 18 (0 pts)</option>
            </select>
        </div>

        {/* Experience 5y */}
        <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Work Exp (Last 5 Years)</label>
            <select 
                className="w-full p-3 border rounded-lg bg-gray-50"
                value={formData.experience5y}
                onChange={(e) => setFormData({...formData, experience5y: e.target.value})}
            >
                <option value="5">5 Years (10 pts)</option>
                <option value="4">4 Years (8 pts)</option>
                <option value="3">3 Years (6 pts)</option>
                <option value="2">2 Years (4 pts)</option>
                <option value="1">1 Year (2 pts)</option>
                <option value="0">Less than 1 Year</option>
            </select>
        </div>

        {/* Experience 6-10y */}
        <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Work Exp (6-10 Years Prior)</label>
            <select 
                className="w-full p-3 border rounded-lg bg-gray-50"
                value={formData.experience6to10y}
                onChange={(e) => setFormData({...formData, experience6to10y: e.target.value})}
            >
                <option value="5">5 Years (5 pts)</option>
                <option value="4">4 Years (4 pts)</option>
                <option value="3">3 Years (3 pts)</option>
                <option value="2">2 Years (2 pts)</option>
                <option value="0">Less than 2 Years</option>
            </select>
        </div>

        {/* Language 1 */}
        <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">First Language (CLB)</label>
            <select 
                className="w-full p-3 border rounded-lg bg-gray-50"
                value={formData.languageFirst}
                onChange={(e) => setFormData({...formData, languageFirst: e.target.value})}
            >
                <option value="clb8">CLB 8+ (20 pts)</option>
                <option value="clb7">CLB 7 (18 pts)</option>
                <option value="clb6">CLB 6 (16 pts)</option>
                <option value="clb5">CLB 5 (14 pts)</option>
                <option value="clb4">CLB 4 (12 pts)</option>
                <option value="none">Less than CLB 4</option>
            </select>
        </div>
        
         {/* Language 2 */}
         <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Second Language (English/French)</label>
            <select 
                className="w-full p-3 border rounded-lg bg-gray-50"
                value={formData.languageSecond}
                onChange={(e) => setFormData({...formData, languageSecond: e.target.value})}
            >
                <option value="none">None / Not Applicable</option>
                <option value="clb8">CLB 8+ (10 pts)</option>
                <option value="clb7">CLB 7 (8 pts)</option>
                <option value="clb6">CLB 6 (6 pts)</option>
                <option value="clb5">CLB 5 (4 pts)</option>
                <option value="clb4">CLB 4 (2 pts)</option>
            </select>
        </div>
      </div>

      <div className="mt-8 bg-gray-50 p-6 rounded-xl border border-gray-200">
        <h4 className="font-semibold text-gray-800 mb-4">Connection to Saskatchewan Labour Market</h4>
        <div className="grid md:grid-cols-2 gap-4">
             <label className="flex items-center space-x-3 cursor-pointer hover:bg-white p-2 rounded transition-colors">
                <input 
                    type="checkbox" 
                    className="w-5 h-5 text-primary rounded"
                    checked={formData.connection.offer}
                    onChange={(e) => setFormData({...formData, connection: {...formData.connection, offer: e.target.checked}})}
                />
                <span className="text-sm text-gray-700">High Skilled Employment Offer (+30)</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer hover:bg-white p-2 rounded transition-colors">
                <input 
                    type="checkbox" 
                    className="w-5 h-5 text-primary rounded"
                    checked={formData.connection.relative}
                    onChange={(e) => setFormData({...formData, connection: {...formData.connection, relative: e.target.checked}})}
                />
                <span className="text-sm text-gray-700">Close Family Relative in SK (+20)</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer hover:bg-white p-2 rounded transition-colors">
                <input 
                    type="checkbox" 
                    className="w-5 h-5 text-primary rounded"
                    checked={formData.connection.pastWork}
                    onChange={(e) => setFormData({...formData, connection: {...formData.connection, pastWork: e.target.checked}})}
                />
                <span className="text-sm text-gray-700">Past Work Experience in SK (1yr+) (+5)</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer hover:bg-white p-2 rounded transition-colors">
                <input 
                    type="checkbox" 
                    className="w-5 h-5 text-primary rounded"
                    checked={formData.connection.pastStudent}
                    onChange={(e) => setFormData({...formData, connection: {...formData.connection, pastStudent: e.target.checked}})}
                />
                <span className="text-sm text-gray-700">Past Student Experience in SK (+5)</span>
            </label>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
            <Button onClick={calculatePoints} size="lg" className="w-full md:w-auto px-12 py-4 shadow-lg">
                Calculate SINP Points
            </Button>
      </div>

      {showResult && (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-8 p-6 rounded-xl text-center border-2 ${points >= 60 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}
        >
            <p className="text-gray-600 font-medium mb-1">Total Points</p>
            <div className={`text-5xl font-bold mb-3 ${points >= 60 ? 'text-green-600' : 'text-red-500'}`}>
                {points} <span className="text-xl text-gray-400">/ 110</span>
            </div>
            <p className={`text-lg font-semibold ${points >= 60 ? 'text-green-700' : 'text-red-700'}`}>
                {points >= 60 
                    ? "You meet the 60 points requirement for SINP." 
                    : "You are below the 60 points threshold."}
            </p>
        </motion.div>
      )}
    </div>
  );
};
