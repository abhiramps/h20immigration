import { CLBCalculatorAdvanced } from "@/components/calculators/advanced/CLBCalculatorAdvanced";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advanced IELTS to CLB Converter | H20 Immigration",
  description: "Official conversion table and calculator for IELTS General Training to Canadian Language Benchmark (CLB) levels.",
};

export default function CLBCalculatorPage() {
  return (
    <main className="bg-gray-50 min-h-screen pt-20">
      <Section className="py-12 md:py-20">
        <Container>
            <div className="mb-8">
                <a href="/#calculators" className="inline-flex items-center text-primary hover:underline mb-4 font-medium">
                    ← Back to Quick Calculators
                </a>
            </div>
            <CLBCalculatorAdvanced />
        </Container>
      </Section>
    </main>
  );
}
