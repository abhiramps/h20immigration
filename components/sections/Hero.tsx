"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { useLeadModal } from "@/context/LeadModalContext";
import Link from "next/link";

export const Hero = () => {
  const { openModal } = useLeadModal();

  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-secondary">
      {/* Background Particles/Shapes - simplified for now */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-1/2 -left-24 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-accent/10 rounded-full blur-[100px]" />
      </div>

      <Container className="relative z-10 flex flex-col items-center justify-center py-20">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white space-y-8 max-w-4xl text-center"
        >
          <div className="inline-flex items-center space-x-2 bg-white/10 px-6 py-2 rounded-full backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors cursor-default">
            <span className="text-yellow-400 text-lg">⭐</span>
            <span className="text-base font-medium">Trusted by 1000+ Clients Worldwide</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading leading-tight tracking-tight">
            Your Pathway to <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-white to-blue-200">Global Dreams</span>
          </h1>

          <p className="text-lg md:text-2xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Expert immigration guidance for Permanent Residency, Job Seeker Visas, and Studies worldwide. Start your journey today.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 pt-6 justify-center">
            <Button variant="primary" size="lg" className="shadow-xl shadow-accent/20 text-lg px-8 h-14" onClick={openModal}>
              Get Your Free Evaluation
            </Button>
            <Link href="#services">
              <Button variant="outline" size="lg" className="text-lg px-8 h-14 backdrop-blur-md bg-white/5 border-white/30 hover:bg-white/10">
                Explore Services
              </Button>
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
