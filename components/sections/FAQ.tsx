"use client";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Accordion } from "@/components/ui/Accordion";

const faqs = [
  {
    question: "How long does PR processing take?",
    answer: "Processing times vary by country (6-12 months typically). Our experts will provide you an accurate estimate based on your profile and current immigration trends.",
  },
  {
    question: "What documents do I need?",
    answer: "Required documents typically include a valid passport, educational certificates, employment letters, language test scores (IELTS/TOEFL), and medical records. We provide a complete, personalized checklist once you enroll.",
  },
  {
    question: "How much does your service cost?",
    answer: "Our packages start from ₹50,000 for basic consultation. Premium packages with full application support range from ₹2-5 lakhs depending on the complexity of your case and services required.",
  },
  {
    question: "Can I apply while working?",
    answer: "Yes, most immigration programs allow you to apply while employed. In fact, current employment can often earn you additional points. You can transition to your new country once approved.",
  },
  {
    question: "Is IELTS mandatory?",
    answer: "It depends on the country and program. Most English-speaking countries (Canada, Australia, UK) require English proficiency proof. We help you prepare and schedule your test.",
  },
  {
    question: "What if my application gets rejected?",
    answer: "We offer free reapplication support if your application is rejected due to an error on our part. Our team will analyze the rejection reasons and help correct any issues for a stronger re-application.",
  },
  {
    question: "Can family members be included?",
    answer: "Yes, most PR and job visa programs allow you to include your spouse and dependent children in your application. We guide you through the process of family sponsorship.",
  },
  {
    question: "How do you guarantee success?",
    answer: "While no honest agency can guarantee 100% approval as the final decision lies with the government, our 98% success rate comes from thorough preparation, legal expertise, and strict quality control of your application.",
  },
  {
    question: "Do you provide post-approval support?",
    answer: "Yes! We assist with visa stamping, flight bookings, temporary accommodation guidance, and even provide a 'Settling-In' guide to help you find your feet in your new country.",
  },
  // {
  //   question: "Are your consultants certified?",
  //   answer: "Absolutely. All our senior consultants are ICCRC-certified (for Canada) or have equivalent credentials for other countries, with 10+ years of immigration experience.",
  // },
];

export const FAQ = () => {
  return (
    <Section id="faq" className="bg-light-gray">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-dark-charcoal mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-lg">
            Answers to common queries about your immigration process
          </p>
        </div>

        <Accordion items={faqs} />
      </Container>
    </Section>
  );
};
