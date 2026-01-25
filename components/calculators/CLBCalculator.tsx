"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

export const CLBCalculator = () => {
  const [result, setResult] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    reading: "7.0",
    writing: "7.0",
    listening: "7.5",
    speaking: "7.0",
  });

  const calculateCLB = () => {
    // Helper to get CLB for a single skill based on IELTS
    const getSkillCLB = (skill: string, score: number) => {
        if (skill === 'reading') {
            if (score >= 8.0) return 10;
            if (score >= 7.0) return 9;
            if (score >= 6.5) return 8;
            if (score >= 6.0) return 7;
            if (score >= 5.0) return 6;
            if (score >= 4.0) return 5;
            if (score >= 3.5) return 4;
            return 3; 
        }
        if (skill === 'writing') {
            if (score >= 7.5) return 10;
            if (score >= 7.0) return 9;
            if (score >= 6.5) return 8;
            if (score >= 6.0) return 7;
            if (score >= 5.5) return 6;
            if (score >= 5.0) return 5;
            if (score >= 4.0) return 4;
            return 3;
        }
        if (skill === 'listening') {
            if (score >= 8.5) return 10;
            if (score >= 8.0) return 9;
            if (score >= 7.5) return 8;
            if (score >= 6.0) return 7;
            if (score >= 5.5) return 6;
            if (score >= 5.0) return 5;
            if (score >= 4.5) return 4;
            return 3;
        }
        if (skill === 'speaking') {
            if (score >= 7.5) return 10;
            if (score >= 7.0) return 9;
            if (score >= 6.5) return 8;
            if (score >= 6.0) return 7;
            if (score >= 5.5) return 6;
            if (score >= 5.0) return 5;
            if (score >= 4.0) return 4;
            return 3;
        }
        return 0;
    };

    const r = getSkillCLB('reading', parseFloat(formData.reading));
    const w = getSkillCLB('writing', parseFloat(formData.writing));
    const l = getSkillCLB('listening', parseFloat(formData.listening));
    const s = getSkillCLB('speaking', parseFloat(formData.speaking));

    // The overall CLB is usually not a single number but a set of 4.
    // However, for "calculator" purposes, people often want to know their "Lowest" or "Average" or just see the breakdown.
    // We'll return the lowest common denominator often used for "eligibility" (e.g., "CLB 7 in all bands")
    // Let's just store the minimum for the "Overall Level" display, but maybe display individual too.
    
    setResult(Math.min(r, w, l, s)); 
  };

  const ieltsOptions = ["9.0", "8.5", "8.0", "7.5", "7.0", "6.5", "6.0", "5.5", "5.0", "4.5", "4.0", "3.5", "3.0"];

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl max-w-4xl mx-auto border border-gray-100">
      <h3 className="text-2xl font-bold text-primary mb-6 border-b pb-4">IELTS to CLB Converter</h3>
      
      <div className="grid md:grid-cols-4 gap-6">
        {['Reading', 'Writing', 'Listening', 'Speaking'].map((skill) => (
             <div key={skill} className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">{skill} Score</label>
                <select 
                    className="w-full p-3 border rounded-lg bg-gray-50"
                    value={formData[skill.toLowerCase() as keyof typeof formData]}
                    onChange={(e) => setFormData({...formData, [skill.toLowerCase()]: e.target.value})}
                >
                    {ieltsOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
            </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Button onClick={calculateCLB} size="lg" className="w-full md:w-auto px-12 py-4 shadow-lg">
            Convert to CLB
        </Button>
      </div>

      {result !== null && (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 bg-blue-50 border border-blue-100 rounded-xl text-center"
        >
            <p className="text-gray-600 font-medium mb-1">Your Lowest CLB Level</p>
            <div className="text-5xl font-bold text-primary mb-3">CLB {result}</div>
            <p className="text-sm text-gray-500">
                (Based on your lowest score across all four abilities)
            </p>
            
            {/* Optional: Detailed breakdown could go here if requested, simplified for now */}
        </motion.div>
      )}

      <div className="mt-8 p-4 bg-yellow-50 rounded-lg text-sm text-yellow-800">
          <strong>Note:</strong> CELPIP scores correspond directly to CLB levels (e.g., CELPIP 7 = CLB 7). This calculator is specifically for IELTS General Training.
      </div>
    </div>
  );
};
