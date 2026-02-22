"use client";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { HiUser, HiDocumentText, HiClipboardCheck, HiCheckCircle } from "react-icons/hi";
import { BsChatDotsFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const timelineSteps = [
  {
    id: 1,
    title: "Profile Evaluation",
    description: "Submit your professional profile and documents for initial assessment",
    icon: HiUser,
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "Language Assessment",
    description: "Verify your English or French language proficiency with IELTS/TOEFL scores",
    icon: BsChatDotsFill,
    color: "bg-teal-500",
  },
  {
    id: 3,
    title: "Document Verification",
    description: "We authenticate and organize all required documents for your application",
    icon: HiClipboardCheck,
    color: "bg-accent",
  },
  {
    id: 4,
    title: "Application Filing",
    description: "Submit your complete application to the immigration authorities",
    icon: HiDocumentText,
    color: "bg-green-500",
  },
  {
    id: 5,
    title: "Visa Approval",
    description: "Receive your approval notification and prepare for your new journey",
    icon: HiCheckCircle,
    color: "bg-purple-500",
  },
];

export const Timeline = () => {
  return (
    <Section className="bg-white">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-dark-charcoal">
            Your Immigration Journey in 5 Steps
          </h2>
          <p className="text-gray-600 text-lg">
            A clear, transparent process from start to approval
          </p>
        </div>

        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-teal-100 -translate-x-1/2" />

          <div className="space-y-12">
            {timelineSteps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={cn(
                    "relative flex items-center md:justify-between",
                    !isEven && "md:flex-row-reverse"
                  )}
                >
                  {/* Icon Node */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-4 border-white shadow-lg flex items-center justify-center z-10 text-white text-xl bg-white">
                     <div className={cn("w-full h-full rounded-full flex items-center justify-center", step.color)}>
                        <step.icon />
                     </div>
                  </div>

                  {/* Content Card */}
                  <div className={cn(
                    "ml-16 md:ml-0 md:w-[45%] p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300",
                    isEven ? "md:mr-auto" : "md:ml-auto"
                  )}>
                    <div className="flex items-center space-x-3 mb-2">
                        <span className={cn("text-xs font-bold px-2 py-1 rounded bg-opacity-10 text-opacity-100 uppercase tracking-tighter", step.color.replace('bg-', 'text-').replace('500', '600'), step.color.replace('bg-', 'bg-').replace('500', '100'))}>
                            Step 0{step.id}
                        </span>
                    </div>
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
};
