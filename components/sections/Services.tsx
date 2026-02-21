"use client";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { HiBriefcase, HiAcademicCap, HiCalculator, HiArrowRight } from "react-icons/hi";
import { FaPassport } from "react-icons/fa";
import { IconType } from "react-icons";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ServiceBoxProps {
  icon: IconType;
  title: string;
  description: string;
  features: string[];
  color: string;
  borderColor: string;
  ctaLink: string;
  ctaText: string;
}

const services: ServiceBoxProps[] = [
  {
    icon: FaPassport,
    title: "Permanent Residency",
    description: "Secure your future with permanent residency in your dream country",
    features: ["Profile evaluation", "Language eligibility check", "Educational assessment", "Points calculation"],
    color: "bg-blue-100 text-blue-600",
    borderColor: "border-l-blue-600",
    ctaLink: "",
    ctaText: "Learn More",
  },
  {
    icon: HiBriefcase,
    title: "Job Seeker Visa",
    description: "Find your ideal job and work in a thriving international market",
    features: ["Work permit guidance", "Job search assistance", "Employer sponsorship", "Skills validation"],
    color: "bg-orange-100 text-orange-600",
    borderColor: "border-l-orange-500",
    ctaLink: "",
    ctaText: "Learn More",
  },
  {
    icon: HiAcademicCap,
    title: "Study Visa",
    description: "Pursue world-class education and unlock global career opportunities",
    features: ["University selection", "Admission assistance", "Course eligibility", "Scholarship guidance"],
    color: "bg-green-100 text-green-600",
    borderColor: "border-l-green-500",
    ctaLink: "",
    ctaText: "Learn More",
  },
  {
    icon: HiCalculator,
    title: "Eligibility Calculators",
    description: "Instantly check your eligibility for various countries and programs",
    features: ["5+ country calculators", "Real-time assessment", "Instant results", "Free & easy to use"],
    color: "bg-purple-100 text-purple-600",
    borderColor: "border-l-purple-500",
    ctaLink: "#calculators",
    ctaText: "Try Calculator",
  },
];

export const Services = () => {
  return (
    <Section id="services" className="bg-light-gray/50">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-dark-charcoal">
            Our Core Services
          </h2>
          <p className="text-gray-600 text-lg">
            Comprehensive immigration solutions tailored to your unique goals and profile
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card 
                key={index} 
                className={cn(
                    "relative overflow-hidden group border-l-4",
                    service.borderColor
                )}
            >
              <div className="flex flex-col h-full">
                <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-6", service.color)}>
                  <service.icon />
                </div>
                
                <h3 className="text-xl font-bold font-heading text-gray-900 mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-6 flex-grow">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-8">
                   {service.features.map((feature, idx) => (
                     <li key={idx} className="flex items-center text-sm text-gray-600">
                       <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mr-2 flex-shrink-0" />
                       {feature}
                     </li>
                   ))}
                </ul>

                <Link href={service.ctaLink} className="inline-flex items-center text-primary font-semibold group-hover:text-accent transition-colors mt-auto">
                  {service.ctaText} <HiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
};
