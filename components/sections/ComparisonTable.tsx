"use client";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { HiCheck, HiX } from "react-icons/hi";

const features = [
    { name: "Processing Time", pr: "6-12 Months", job: "3-6 Months", study: "1-3 Months", calc: "Instant" },
    { name: "Cost Range", pr: "₹50k - ₹2L", job: "₹30k - ₹1L", study: "₹20k - ₹50k", calc: "Free" },
    { name: "Required Documents", pr: "Extensive", job: "Moderate", study: "Moderate", calc: "None" },
    { name: "Language Test", pr: true, job: true, study: true, calc: false },
    { name: "Expert Consultation", pr: true, job: true, study: true, calc: false },
    { name: "Application Tracking", pr: true, job: true, study: true, calc: false },
    { name: "Success Rate", pr: "98%", job: "95%", study: "99%", calc: "N/A" },
];

export const ComparisonTable = () => {
    return (
        <Section className="bg-white">
            <Container>
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading text-dark-charcoal mb-4">
                        Find Your Perfect Solution
                    </h2>
                    <div className="h-1 w-20 bg-teal-500 rounded-full" />
                </div>

                <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-100">
                    <table className="w-full min-w-[900px] border-collapse">
                        <thead>
                            <tr className="bg-primary text-white">
                                <th className="p-4 md:p-5 text-left text-base md:text-lg font-heading">Feature / Service</th>
                                <th className="p-4 md:p-5 text-center text-base md:text-lg font-heading">Permanent Residency</th>
                                <th className="p-4 md:p-5 text-center text-base md:text-lg font-heading">Job Seeker Visa</th>
                                <th className="p-4 md:p-5 text-center text-base md:text-lg font-heading">Study Visa</th>
                                <th className="p-4 md:p-5 text-center text-base md:text-lg font-heading">Calculators</th>
                            </tr>
                        </thead>
                        <tbody>
                            {features.map((row, index) => (
                                <tr key={index} className={`border-b border-gray-100 hover:bg-teal-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                    <td className="p-4 md:p-5 font-bold text-gray-800 border-r border-gray-100/50 text-sm md:text-base">{row.name}</td>
                                    <td className="p-4 md:p-5 text-center text-gray-600 border-r border-gray-100/50 font-medium text-sm md:text-base">
                                        {renderCell(row.pr)}
                                    </td>
                                    <td className="p-4 md:p-5 text-center text-gray-600 border-r border-gray-100/50 font-medium text-sm md:text-base">
                                        {renderCell(row.job)}
                                    </td>
                                    <td className="p-4 md:p-5 text-center text-gray-600 border-r border-gray-100/50 font-medium text-sm md:text-base">
                                        {renderCell(row.study)}
                                    </td>
                                    <td className="p-4 md:p-5 text-center text-gray-600 font-medium text-sm md:text-base">
                                        {renderCell(row.calc)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Container>
        </Section>
    );
};

function renderCell(value: string | boolean) {
    if (typeof value === 'boolean') {
        return value ? (
            <div className="flex justify-center"><HiCheck className="text-teal-500 text-2xl" /></div>
        ) : (
            <div className="flex justify-center"><HiX className="text-gray-300 text-2xl" /></div>
        );
    }
    return value;
}
