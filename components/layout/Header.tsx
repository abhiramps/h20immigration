"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { HiMenu, HiX } from "react-icons/hi";
import { cn } from "@/lib/utils";
import { useLeadModal } from "@/context/LeadModalContext";

const navLinks = [
  { name: "Home", href: "/#home" },
  { name: "Services", href: "/#services" },
  { name: "Tools", href: "/#calculators" },
  { name: "About", href: "/#about" },
  { name: "Testimonials", href: "/#testimonials" },
  { name: "Contact", href: "/#contact" },
];

interface HeaderProps {
  variant?: "transparent" | "solid";
}

export const Header = ({ variant = "transparent" }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openModal } = useLeadModal();

  useEffect(() => {
    if (variant === "solid") {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [variant]);

  const headerIsActive = variant === "solid" || isScrolled;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        headerIsActive
          ? "bg-white/90 backdrop-blur-md shadow-sm py-4"
          : "bg-transparent py-6"
      )}
    >
      <Container>
        <div className="flex items-center justify-between">
          <Link 
            href="/" 
            className={cn(
              "text-2xl font-bold font-heading relative z-50 transition-colors duration-300",
              headerIsActive ? "text-primary" : "text-white"
            )}
          >
            H2O<span className={headerIsActive ? "text-accent" : "text-white"}>Immigration</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-accent",
                  headerIsActive ? "text-dark-charcoal" : "text-white/90 hover:text-white"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Button variant="primary" size="sm" onClick={openModal}>
              Get Started
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "md:hidden p-2 rounded-md relative z-50",
              headerIsActive || isMobileMenuOpen ? "text-gray-900" : "text-white"
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-0 left-0 right-0 bg-white border-b border-gray-100 shadow-xl p-4 pt-20 flex flex-col space-y-4 min-h-screen">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-900 font-medium text-lg border-b border-gray-50 py-2 hover:text-accent"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4">
              <Button variant="primary" fullWidth onClick={() => { setIsMobileMenuOpen(false); openModal(); }}>
                Get Started
              </Button>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
};
