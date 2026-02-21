"use client";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useLeadModal } from "@/context/LeadModalContext";
import Link from "next/link";

export const CTA = () => {
  const { openModal } = useLeadModal();

  return (
    <Section className="bg-primary relative overflow-hidden">
      {/* Background Decor */}
       <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-accent opacity-20 rounded-full blur-3xl pointer-events-none" />
       <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent pointer-events-none" />

      <Container className="relative z-10 text-center py-8">
        <h2 className="text-3xl md:text-5xl font-bold font-heading text-white mb-6">
          Ready to Start Your Journey?
        </h2>
        <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed opacity-90">
          Get expert guidance and transform your immigration dreams into reality.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button variant="primary" size="lg" className="bg-accent text-white hover:bg-accent/90 shadow-lg shadow-accent/25 border-none" onClick={openModal}>
            Get Free Consultation
          </Button>
          <Link href="#contact">
            <Button variant="outline" size="lg">
              Schedule a Call
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
};
