"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-secondary">
      {/* Background Particles/Shapes - simplified for now */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-1/2 -left-24 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-accent/10 rounded-full blur-[100px]" />
      </div>

      <Container className="relative z-10 grid lg:grid-cols-2 gap-12 items-center py-12">
        {/* Text Content */}
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white space-y-6 md:space-y-8"
        >
          <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
            <span className="text-yellow-400">⭐ 4.9/5</span>
            <span className="text-sm font-medium">Trusted by 5000+ Clients</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold font-heading leading-tight">
            Your Pathway to <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-white">Global Dreams</span>
          </h1>
          
          <p className="text-lg md:text-xl text-blue-100 max-w-lg leading-relaxed">
            Expert immigration guidance for Permanent Residency, Job Seeker Visas, and Studies worldwide. Join thousands of successful immigrants today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button variant="primary" size="lg" className="shadow-xl shadow-accent/20">
              Get Your Free Evaluation
            </Button>
            <Button variant="outline" size="lg">
              Explore Options
            </Button>
          </div>
        </motion.div>

        {/* Hero Image/Illustration */}
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
        >
             {/* Abstract representation or placeholder for now */}
             <div className="relative w-full h-[600px] flex items-center justify-center p-8">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent rounded-3xl backdrop-blur-sm border border-white/10 rotate-3" />
                
                {/* Composed UI Elements */}
                <div className="relative z-10 space-y-6 w-full max-w-md">
                   
                     {/* Card 1 */}
                     <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white/95 p-6 rounded-2xl shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-300"
                     >
                        <div className="flex items-center space-x-4 mb-4">
                           <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-3xl">🇨🇦</div>
                           <div>
                              <div className="font-bold text-gray-900 text-lg">Canada PR Approved</div>
                              <div className="text-sm text-green-600 font-medium">Just now</div>
                           </div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                           <span>Express Entry</span>
                           <span className="font-bold text-gray-900">CRS: 485</span>
                        </div>
                     </motion.div>

                     {/* Card 2 */}
                     <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="bg-white/95 p-6 rounded-2xl shadow-2xl transform rotate-2 ml-12 hover:rotate-0 transition-transform duration-300"
                     >
                        <div className="flex items-center space-x-4 mb-4">
                           <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center text-3xl">🇦🇺</div>
                           <div>
                              <div className="font-bold text-gray-900 text-lg">Australia Visa</div>
                              <div className="text-sm text-blue-600 font-medium">Application Received</div>
                           </div>
                        </div>
                        <div className="h-2.5 bg-gray-100 rounded-full w-full overflow-hidden">
                           <div className="h-full bg-blue-500 w-3/4 animate-pulse" />
                        </div>
                     </motion.div>

                     {/* Card 3 */}
                      <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="bg-white/95 p-6 rounded-2xl shadow-2xl transform -rotate-1 mr-8 hover:rotate-0 transition-transform duration-300"
                     >
                        <div className="flex items-center space-x-4">
                           <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl">🇩🇪</div>
                           <div>
                              <div className="font-bold text-gray-900">Germany Job Seeker</div>
                              <div className="text-sm text-gray-500 font-medium">Eligibility Checked</div>
                           </div>
                           <div className="ml-auto bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">ELIGIBLE</div>
                        </div>
                     </motion.div>

                </div>
             </div>
        </motion.div>
      </Container>
    </section>
  );
};
