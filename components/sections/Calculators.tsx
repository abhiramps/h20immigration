"use client";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { HiCalculator } from "react-icons/hi";
import { Button } from "@/components/ui/Button";

const calculators = [
  "Canada PR Calculator",
  "Australia PR Calculator",
  "Germany Work Visa Calculator",
  "Saskatchewan PNP Calculator",
  "CLB/IELTS Converter",
];

export const Calculators = () => {
  return (
    <Section id="calculators" className="bg-gradient-to-br from-primary to-secondary text-white relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <Container className="relative z-10">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-2">
            Check Your Eligibility Now
          </h2>
          <p className="text-blue-100 text-lg opacity-90">
            Use our free calculators to see your chances instantly
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map((calc, index) => (
            <div
              key={index}
              className="group bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl hover:bg-white/20 hover:border-white/30 hover:-translate-y-1 transition-all duration-300 shadow-lg"
            >
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center text-xl flex-shrink-0 text-white">
                  <HiCalculator />
                </div>
                <div className="w-full">
                  <h3 className="font-bold text-lg mb-1 leading-snug">{calc}</h3>
                  <p className="text-sm text-blue-50 mb-4 opacity-80">
                    Assess your eligibility with our advanced algorithm
                  </p>
                  <Button variant="primary" size="sm" fullWidth className="bg-accent hover:bg-accent/90 border-none shadow-md">
                    Try Calculator
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
