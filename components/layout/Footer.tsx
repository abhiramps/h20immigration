"use client";

import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

export const Footer = () => {
    return (
        <footer className="bg-dark-charcoal text-white pt-20 pb-10 border-t border-gray-800">
            <Container>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="space-y-6">
                        <Link href="/" className="text-2xl font-bold font-heading text-white block">
                            H2O<span className="text-accent">Immigration</span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Your trusted partner in global immigration. We facilitate your journey to a better future with expert guidance and transparency.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all"><FaLinkedin size={18} /></a>
                            <a href="#" className="text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all"><FaFacebook size={18} /></a>
                            <a href="#" className="text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all"><FaTwitter size={18} /></a>
                            <a href="#" className="text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all"><FaInstagram size={18} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-lg mb-6">Quick Links</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link href="/#home" className="hover:text-accent transition-colors">Home</Link></li>
                            <li><Link href="/#about" className="hover:text-accent transition-colors">About Us</Link></li>
                            <li><Link href="/#services" className="hover:text-accent transition-colors">Services</Link></li>
                            {/* <li><Link href="#" className="hover:text-accent transition-colors">Blog</Link></li> */}
                            <li><Link href="/#contact" className="hover:text-accent transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Tools */}
                    <div>
                        <h4 className="font-bold text-lg mb-6">Tools & Resources</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link href="#" className="hover:text-accent transition-colors">Canada PR Calculator</Link></li>
                            <li><Link href="#" className="hover:text-accent transition-colors">Australia PR Calculator</Link></li>
                            <li><Link href="#" className="hover:text-accent transition-colors">IELTS Converter</Link></li>
                            {/* <li><Link href="#" className="hover:text-accent transition-colors">Document Checklist</Link></li> */}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    {/* <div>
                         <h4 className="font-bold text-lg mb-6">Stay Updated</h4>
                         <p className="text-gray-400 text-sm mb-4">Get immigration tips and updates monthly.</p>
                         <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                             <input 
                                type="email" 
                                placeholder="Enter your email" 
                                className="w-full px-4 py-2.5 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm"
                             />
                             <button type="submit" className="w-full bg-accent text-white px-4 py-2.5 rounded font-medium hover:bg-accent/90 transition-colors shadow-lg shadow-accent/20">
                                Subscribe
                             </button>
                         </form>
                    </div> */}
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} H2O Immigration. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link>
                    </div>
                </div>
            </Container>
        </footer>
    );
};
