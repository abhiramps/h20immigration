"use client";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { HiStar } from "react-icons/hi";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";

const testimonials = [
  {
    name: "Jean Mishel",
    country: "Canada PR",
    rating: 5,
    quote: "We worked with Akshay from H2O Immigration for my Canadian spousal PR process, and I couldn’t be more grateful for his support. He was extremely professional, approachable, and always willing to go the extra mile. We could reach out to him anytime with questions, and he consistently guided us with patience and clarity. His personal involvement really stood out. As this is his new venture, I wish him all the very best and would highly recommend Akshay from H2O Immigration for immigration and visa services.",
    flag: "🇨🇦",
    avatar: "/assets/avatars/jean.png",
  },
  {
    name: "Sara Jayakumar",
    country: "Australia Visa",
    rating: 5,
    quote: "I had a great experience with Akshay from H2O Immigration while applying for my Germany Opportunity Card. He was extremely supportive throughout the entire process. He always answered my calls promptly, patiently clarified all my doubts, and provided clear and accurate instructions at every step. His guidance made the whole application process smooth and stress-free for me. I truly appreciate his professionalism, dedication, and responsiveness. I highly recommend Akshay and H2O Immigration to anyone seeking reliable assistance for immigration services.",
    flag: "🇦🇺",
  },
  {
    name: "Maria Jacob",
    country: "Germany Job Seeker",
    rating: 5,
    quote: "They made the complex process simple. Best decision ever! I landed a job within 3 months of arriving thanks to their guidance.",
    flag: "🇩🇪",
  },
];

export const Testimonials = () => {
  return (
    <Section id="testimonials" className="bg-light-gray/50">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-dark-charcoal mb-4">
            Success Stories from Our Clients
          </h2>
          <p className="text-gray-600 text-lg">
            Real people, real journeys, real success
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testi, index) => (
            <Card key={index} className="border-l-4 border-l-teal-500 h-full flex flex-col">
              <div className="flex items-center space-x-4 mb-6">
                <Avatar 
                  src={testi.avatar} 
                  alt={testi.name} 
                  className="w-12 h-12"
                  fallbackClassName="bg-gradient-to-br from-teal-500 to-blue-600 text-white"
                />
                <div>
                   <div className="font-bold text-gray-900">{testi.name}</div>
                   <div className="text-sm text-gray-500 flex items-center">
                     <span className="mr-1 text-lg">{testi.flag}</span> {testi.country}
                   </div>
                </div>
              </div>
              
              <div className="flex text-yellow-400 mb-4">
                {[...Array(testi.rating)].map((_, i) => (
                  <HiStar key={i} />
                ))}
              </div>

              <blockquote className="text-gray-600 italic leading-relaxed text-sm flex-grow">
                &ldquo;{testi.quote}&rdquo;
              </blockquote>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
};
