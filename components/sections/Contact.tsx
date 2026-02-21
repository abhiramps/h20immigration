"use client";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { HiPhone, HiMail } from "react-icons/hi";
import { motion } from "framer-motion";

export const Contact = () => {
  return (
    <Section id="contact" className="bg-primary text-white">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="max-w-md">
            <h2 className="text-3xl font-bold font-heading mb-4">Get in Touch</h2>
            <p className="text-blue-100">
              Have questions about your immigration journey? Our experts are here to help you every step of the way.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 md:gap-12">
            <motion.a 
              href="tel:+919048234641" 
              className="flex items-center gap-4 group"
              whileHover={{ x: 5 }}
            >
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                <HiPhone className="text-2xl" />
              </div>
              <div>
                <p className="text-blue-200 text-sm uppercase tracking-wider font-semibold">Call Us</p>
                <p className="text-xl font-bold text-white">+91 9048234641</p>
              </div>
            </motion.a>

            <motion.a 
              href="mailto:Info@h2oimmigration.com" 
              className="flex items-center gap-4 group"
              whileHover={{ x: 5 }}
            >
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                <HiMail className="text-2xl" />
              </div>
              <div>
                <p className="text-blue-200 text-sm uppercase tracking-wider font-semibold">Email Us</p>
                <p className="text-xl font-bold text-white">Info@h2oimmigration.com</p>
              </div>
            </motion.a>
          </div>
        </div>
      </Container>
    </Section>
  );
};
