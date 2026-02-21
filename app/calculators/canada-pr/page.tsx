import { CanadaPRAdvancedCalculator } from "@/components/calculators/advanced/CanadaPRAdvancedCalculator";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advanced Canada FSW Calculator | H2O Immigration",
  description: "Detailed point calculator for Canada's Federal Skilled Worker Program (FSW). Check your eligibility with our comprehensive 67-points grid tool.",
};

export default function CanadaPRCalculatorPage() {
  return (
    <main className="bg-gray-50 min-h-screen pt-20">
      <Section className="py-12 md:py-20">
        <Container>
            <div className="mb-8">
                <a href="/#calculators" className="inline-flex items-center text-primary hover:underline mb-4 font-medium">
                    ← Back to Quick Calculators
                </a>
            </div>
            <CanadaPRAdvancedCalculator />
        </Container>
      </Section>
    </main>
  );
}
