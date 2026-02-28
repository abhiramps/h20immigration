"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { CanadaPRCalculator } from "@/components/calculators/CanadaPRCalculator";
import { AustraliaPRCalculator } from "@/components/calculators/AustraliaPRCalculator";
import { GermanyOpportunityCardCalculator } from "@/components/calculators/GermanyOpportunityCardCalculator";
import { SaskatchewanPNPCalculator } from "@/components/calculators/SaskatchewanPNPCalculator";
import { CLBCalculator } from "@/components/calculators/CLBCalculator";
import { motion, AnimatePresence } from "framer-motion";

const calculators = [
  { id: "canada", name: "Canada PR (FSW)", component: CanadaPRCalculator },
  { id: "australia", name: "Australia PR", component: AustraliaPRCalculator },
  { id: "germany", name: "Germany Opportunity Card", component: GermanyOpportunityCardCalculator },
  { id: "saskatchewan", name: "Saskatchewan PNP", component: SaskatchewanPNPCalculator },
  { id: "clb", name: "IELTS to CLB", component: CLBCalculator },
];

export const Calculators = () => {
  const [activeCalc, setActiveCalc] = useState(calculators[0].id);

  return (
    <Section id="calculators" className="bg-gradient-to-br from-gray-50 to-white relative overflow-hidden py-20">
      
      <Container className="relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-gray-900 mb-4">
            Free Eligibility Calculators
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Check your eligibility for various immigration programs instantly with our comprehensive points calculators.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10" role="tablist">
            {calculators.map((calc) => (
                <button
                    key={calc.id}
                    role="tab"
                    aria-selected={activeCalc === calc.id}
                    aria-controls={`calc-panel-${calc.id}`}
                    onClick={() => setActiveCalc(calc.id)}
                    className={`px-6 py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 border-2 ${
                        activeCalc === calc.id
                        ? "bg-primary text-white border-primary shadow-lg scale-105"
                        : "bg-white text-gray-600 border-gray-200 hover:border-primary/50 hover:bg-gray-50"
                    }`}
                >
                    {calc.name}
                </button>
            ))}
        </div>

        {/* Active Calculator Area */}
        <div className="min-h-[400px] md:min-h-[600px]">
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeCalc}
                    id={`calc-panel-${activeCalc}`}
                    role="tabpanel"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {calculators.map((calc) => (
                        activeCalc === calc.id && <calc.component key={calc.id} />
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>

      </Container>
    </Section>
  );
};