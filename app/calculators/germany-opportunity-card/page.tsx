import { GermanyOpportunityCardAdvancedCalculator } from "@/components/calculators/advanced/GermanyOpportunityCardAdvancedCalculator";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advanced Germany Opportunity Card Calculator | H20 Immigration",
  description: "Detailed points calculator for the Germany Opportunity Card (Chancenkarte). Check your eligibility with our comprehensive tool.",
};

export default function GermanyOpportunityCardCalculatorPage() {
  return (
    <main className="bg-gray-50 min-h-screen pt-20">
      <Section className="py-12 md:py-20">
        <Container>
            <div className="mb-8">
                <a href="/#calculators" className="inline-flex items-center text-primary hover:underline mb-4 font-medium">
                    ← Back to Quick Calculators
                </a>
            </div>
            <GermanyOpportunityCardAdvancedCalculator />
        </Container>
      </Section>
    </main>
  );
}
