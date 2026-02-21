import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export default function TermsConditions() {
  return (
    <main className="min-h-screen bg-white font-sans selection:bg-accent selection:text-white pt-20">
      <Header variant="solid" />
      <Section>
        <Container>
          <div className="max-w-4xl mx-auto space-y-12 py-10">
            <header className="border-b pb-8">
              <h1 className="text-4xl md:text-5xl font-bold font-heading text-primary mb-4">
                Terms and Conditions
              </h1>
              <p className="text-gray-500">Last Updated: February 21, 2026</p>
            </header>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">1. Acceptance of Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                By accessing this website and utilizing the services of H20 Immigration Agency, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our services.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">2. Description of Services</h2>
              <p className="text-gray-600 leading-relaxed">
                H20 Immigration Agency provides consultancy services related to immigration, visa applications, PR assessment, and document preparation. We offer expert guidance to help you navigate the complex immigration processes of various countries.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">3. No Guarantee of Outcome</h2>
              <p className="text-gray-600 leading-relaxed">
                While we strive to provide the most accurate and expert advice, H20 Immigration Agency does not guarantee the approval of any visa application. The final decision on any immigration matter lies solely with the respective government immigration authorities.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">4. User Obligations</h2>
              <p className="text-gray-600 leading-relaxed">
                As a client, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Provide accurate, truthful, and complete information at all times.</li>
                <li>Submit requested documents within the specified timelines.</li>
                <li>Notify us of any changes in your personal circumstances.</li>
              </ul>
              <p className="text-gray-600 leading-relaxed font-semibold">
                Submission of false or misleading information may lead to the rejection of your application and termination of our services without a refund.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">5. Fees and Payment</h2>
              <p className="text-gray-600 leading-relaxed">
                All fees for consultancy services must be paid in full as per the agreed-upon payment schedule. Government visa application fees are separate and are the responsibility of the applicant unless otherwise stated.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">6. Intellectual Property</h2>
              <p className="text-gray-600 leading-relaxed">
                All content on this website, including text, graphics, logos, and software, is the property of H20 Immigration Agency and is protected by intellectual property laws.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">7. Limitation of Liability</h2>
              <p className="text-gray-600 leading-relaxed">
                H20 Immigration Agency shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services or the outcome of your visa application.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">8. Governing Law</h2>
              <p className="text-gray-600 leading-relaxed">
                These Terms and Conditions are governed by and construed in accordance with the laws of the jurisdiction in which H20 Immigration Agency operates.
              </p>
            </section>
          </div>
        </Container>
      </Section>
      <Footer />
    </main>
  );
}
