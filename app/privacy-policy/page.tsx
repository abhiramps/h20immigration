import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | H2O Immigration",
  description: "Learn about how H2O Immigration protects and handles your personal data.",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white font-sans selection:bg-accent selection:text-white pt-20">
      <Header variant="solid" />
      <Section>
        <Container>
          <div className="max-w-4xl mx-auto space-y-12 py-10">
            <header className="border-b pb-8">
              <h1 className="text-4xl md:text-5xl font-bold font-heading text-primary mb-4">
                Privacy Policy
              </h1>
              <p className="text-gray-500">Last Updated: February 21, 2026</p>
            </header>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">1. Introduction</h2>
              <p className="text-gray-600 leading-relaxed">
                At H2O Immigration, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website and use our immigration consultancy services.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">2. Information We Collect</h2>
              <p className="text-gray-600 leading-relaxed">
                To provide you with the best immigration advice and service, we may collect the following types of information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Personal identifiers (name, email address, phone number).</li>
                <li>Biographical details for immigration assessment (age, education, work experience).</li>
                <li>Passport and identification document details (when necessary for processing).</li>
                <li>Usage data (how you interact with our website).</li>
              </ul>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">3. How We Use Your Information</h2>
              <p className="text-gray-600 leading-relaxed">
                We use your information for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>To assess your eligibility for various immigration programs.</li>
                <li>To communicate with you regarding your application or inquiries.</li>
                <li>To process payments for our consultancy services.</li>
                <li>To comply with legal and regulatory requirements.</li>
              </ul>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">4. Information Sharing</h2>
              <p className="text-gray-600 leading-relaxed">
                We do not sell your personal information. We may share your data only with:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Government immigration authorities as required for your visa application.</li>
                <li>Trusted third-party service providers who assist in our operations (e.g., payment processors).</li>
                <li>Legal entities if required by law.</li>
              </ul>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">5. Data Security</h2>
              <p className="text-gray-600 leading-relaxed">
                We implement robust security measures to protect your data from unauthorized access, alteration, or disclosure. This includes encryption, secure servers, and limited access to sensitive information.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">6. Contact Us</h2>
              <p className="text-gray-600 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="text-gray-600">
                Email: privacy@h2oimmigration.com<br />
                Address: H2O Immigration, City Center, Global Hub.
              </p>
            </section>
          </div>
        </Container>
      </Section>
      <Footer />
    </main>
  );
}
