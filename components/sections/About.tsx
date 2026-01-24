"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

export const About = () => {
    return (
        <section id="about" className="py-24 bg-white relative overflow-hidden">
            <Container>
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Visual Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                            <div className="bg-gray-200 h-[600px] w-full flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1742&q=80")' }}>
                                <div className="absolute inset-0 bg-primary/20 mix-blend-multiply transition-opacity hover:opacity-0 duration-500" />
                            </div>
                        </div>

                        {/* Floating Badge */}
                         <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="absolute -bottom-10 -right-10 z-20 bg-white p-8 rounded-2xl shadow-xl max-w-xs border-t-4 border-accent"
                         >
                             <div className="flex items-center gap-4 mb-3">
                                 <div className="text-4xl font-bold text-accent">98%</div>
                                 <div className="text-sm text-gray-600 font-medium">Visa Approval Rate</div>
                             </div>
                             <p className="text-xs text-gray-500 leading-relaxed">
                                 Consistently delivering success through expert guidance and meticulous documentation.
                             </p>
                         </motion.div>

                         {/* Decorative Element */}
                         <div className="absolute -top-10 -left-10 w-40 h-40 bg-teal-50 rounded-full blur-3xl -z-10" />
                         <div className="absolute bottom-10 right-10 w-60 h-60 bg-blue-50 rounded-full blur-3xl -z-10" />
                    </motion.div>

                    {/* Content Section */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="inline-block bg-accent/10 px-4 py-1.5 rounded-full text-accent font-semibold text-sm mb-4">
                                Who We Are
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-bold font-heading text-gray-900 leading-tight">
                                We Are The Architects of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Your Global Future</span>
                            </h2>
                        </motion.div>

                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-lg text-gray-600 leading-relaxed"
                        >
                            Founded on the pillars of integrity, expertise, and transparency, H20 Immigration has been a guiding light for thousands of families and professionals seeking a new life abroad. We understand that immigration is more than just paperwork; it’s a life-changing journey, and we are honored to be a part of it.
                        </motion.p>

                         <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="grid sm:grid-cols-2 gap-6"
                        >
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 text-blue-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-lg">Licensed Experts</h4>
                                    <p className="text-sm text-gray-500">Regulated and certified immigration consultants.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0 text-teal-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-lg">Transparent Process</h4>
                                    <p className="text-sm text-gray-500">No hidden fees, clear timelines and honest advice.</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="pt-6"
                        >
                            <Button size="lg" className="px-8 shadow-xl shadow-accent/20">
                                Learn More About Us
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </Container>
        </section>
    );
};
