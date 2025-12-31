"use client";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { HiChartSquareBar, HiUsers, HiCheckCircle, HiArrowRight } from "react-icons/hi";
import Link from "next/link";

const features = [
  {
    icon: HiChartSquareBar,
    title: "Smart Dashboard",
    description: "Track your application progress in real-time with our advanced tracking system. Get instant notifications at every stage.",
    color: "text-blue-600",
    bg: "bg-blue-50",
    cta: "See Dashboard Demo",
  },
  {
    icon: HiUsers,
    title: "Expert Consultants",
    description: "Work with certified immigration lawyers and consultants with 15+ years of experience. Available 24/7 for your queries.",
    color: "text-teal-600",
    bg: "bg-teal-50",
    cta: "Meet Our Team",
  },
  {
    icon: HiCheckCircle,
    title: "98% Success Rate",
    description: "Our data-driven approach ensures the highest approval rates. Join 5000+ satisfied clients who achieved their dreams.",
    color: "text-orange-600",
    bg: "bg-orange-50",
    cta: "View Success Stories",
  },
];

export const Features = () => {
  return (
    <Section className="bg-white">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-dark-charcoal mb-4">
            Why Thousands Choose Us
          </h2>
          <div className="h-1 w-20 bg-accent mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group p-6 rounded-2xl hover:bg-gray-50 transition-colors duration-300">
              <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-3xl mb-6 ${feature.bg} ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon />
              </div>
              
              <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {feature.description}
              </p>

              <Link href="#" className={`inline-flex items-center font-semibold ${feature.color} hover:underline`}>
                {feature.cta} <HiArrowRight className="ml-1" />
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
