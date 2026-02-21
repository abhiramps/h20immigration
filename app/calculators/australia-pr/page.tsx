import { AustraliaPRAdvancedCalculator } from "@/components/calculators/advanced/AustraliaPRAdvancedCalculator";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advanced Australia PR Points Calculator | H2O Immigration",
  description: "Detailed 65-points calculator for Australia's General Skilled Migration (Subclass 189, 190, 491). Check your eligibility with our comprehensive tool.",
};

export default function AustraliaPRCalculatorPage() {
  return (
    <main className="bg-gray-50 min-h-screen pt-20">
      <Section className="py-12 md:py-20">
        <Container>
            <div className="mb-8">
                <a href="/#calculators" className="inline-flex items-center text-primary hover:underline mb-4 font-medium">
                    ← Back to Quick Calculators
                </a>
            </div>
            <AustraliaPRAdvancedCalculator />
        </Container>
      </Section>
    </main>
  );
}
