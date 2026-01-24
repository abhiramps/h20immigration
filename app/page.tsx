import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Timeline } from "@/components/sections/Timeline";
import { Features } from "@/components/sections/Features";
import { Calculators } from "@/components/sections/Calculators";
import { Testimonials } from "@/components/sections/Testimonials";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { CTA } from "@/components/sections/CTA";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans selection:bg-accent selection:text-white">
      <Header />
      <Hero />
      <About />
      <Services />
      <Timeline />
      <Features />
      <Calculators />
      <Testimonials />
      <ComparisonTable />
      <CTA />
      <FAQ />
      <Footer />
    </main>
  );
}
