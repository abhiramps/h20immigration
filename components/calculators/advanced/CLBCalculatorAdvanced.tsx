"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";

export const CLBCalculatorAdvanced = () => {
  const [result, setResult] = useState<number | null>(null);
  const [breakdown, setBreakdown] = useState<{ [key: string]: number }>({});
  const [formData, setFormData] = useState({
    reading: "7.0",
    writing: "7.0",
    listening: "7.5",
    speaking: "7.0",
  });

  const calculateCLB = () => {
    // Helper to get CLB for a single skill based on IELTS General Training
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

    setBreakdown({ Reading: r, Writing: w, Listening: l, Speaking: s });
    // Usually "Overall CLB" isn't a single number, but programs often ask for "minimum CLB level met in all 4".
    setResult(Math.min(r, w, l, s)); 
  };

  const ieltsOptions = ["9.0", "8.5", "8.0", "7.5", "7.0", "6.5", "6.0", "5.5", "5.0", "4.5", "4.0", "3.5", "3.0"];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 md:p-8 bg-gradient-to-r from-primary/5 to-transparent border-b border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900">IELTS to CLB Converter (Advanced)</h1>
          <p className="text-gray-600 mt-2">
            Convert your IELTS General Training scores to Canadian Language Benchmark (CLB) levels.
          </p>
      </div>

      <div className="p-6 md:p-8 space-y-10">
        
        {/* Calculator Section */}
        <section>
            <h3 className="text-xl font-bold text-primary mb-6">Calculate Your CLB Level</h3>
            <div className="grid md:grid-cols-4 gap-6">
                {['Reading', 'Writing', 'Listening', 'Speaking'].map((skill) => (
                    <div key={skill} className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">{skill} Score</label>
                        <select 
                            className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary/20 outline-none"
                            value={formData[skill.toLowerCase() as keyof typeof formData]}
                            onChange={(e) => setFormData({...formData, [skill.toLowerCase()]: e.target.value})}
                        >
                            {ieltsOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    </div>
                ))}
            </div>

            <div className="mt-8 flex flex-col items-center">
                <Button onClick={calculateCLB} size="lg" className="w-full md:w-auto px-16 py-4 shadow-lg">
                    Convert Scores
                </Button>
            </div>

            <AnimatePresence>
                {result !== null && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-8 p-6 bg-blue-50 border border-blue-100 rounded-xl"
                    >
                        <div className="text-center mb-6">
                            <p className="text-gray-600 font-medium mb-1">Your Minimum CLB Level</p>
                            <div className="text-5xl font-bold text-primary">CLB {result}</div>
                            <p className="text-sm text-gray-500 mt-2">
                                This is the level you meet across ALL four abilities.
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-blue-200">
                            {Object.entries(breakdown).map(([skill, score]) => (
                                <div key={skill} className="text-center">
                                    <div className="text-xs text-gray-500 uppercase font-semibold">{skill}</div>
                                    <div className="text-xl font-bold text-gray-800">CLB {score}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>

        {/* Reference Table */}
        <section className="pt-10 border-t border-gray-100">
            <h3 className="text-xl font-bold text-primary mb-6">Official Conversion Table (IELTS General)</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                    <thead className="bg-gray-50 text-gray-700 uppercase font-semibold">
                        <tr>
                            <th className="px-6 py-4 border-b">CLB Level</th>
                            <th className="px-6 py-4 border-b">Listening</th>
                            <th className="px-6 py-4 border-b">Reading</th>
                            <th className="px-6 py-4 border-b">Writing</th>
                            <th className="px-6 py-4 border-b">Speaking</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {[
                            { clb: 10, l: "8.5 – 9.0", r: "8.0 – 9.0", w: "7.5 – 9.0", s: "7.5 – 9.0" },
                            { clb: 9, l: "8.0", r: "7.0", w: "7.0", s: "7.0" },
                            { clb: 8, l: "7.5", r: "6.5", w: "6.5", s: "6.5" },
                            { clb: 7, l: "6.0 – 7.0", r: "6.0", w: "6.0", s: "6.0" },
                            { clb: 6, l: "5.5", r: "5.0", w: "5.5", s: "5.5" },
                            { clb: 5, l: "5.0", r: "4.0", w: "5.0", s: "5.0" },
                            { clb: 4, l: "4.5", r: "3.5", w: "4.0", s: "4.0" },
                        ].map((row) => (
                            <tr key={row.clb} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-bold text-primary">CLB {row.clb}</td>
                                <td className="px-6 py-4">{row.l}</td>
                                <td className="px-6 py-4">{row.r}</td>
                                <td className="px-6 py-4">{row.w}</td>
                                <td className="px-6 py-4">{row.s}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="mt-4 text-sm text-gray-500 italic">
                *Note: This table is for IELTS General Training only. IELTS Academic is not accepted for this conversion.
            </p>
        </section>

      </div>
    </div>
  );
};
