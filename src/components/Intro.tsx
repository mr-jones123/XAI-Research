"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import MaskedEffect from "@/components/MaskedEffect";
import HowItWorks from "./HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";
import ExplainabilitySection from "./ExplainabilitySection";
import TeamSection from "./TeamSection";
import PixelBlast from "@/components/ui/pixel-blast";
import { useState, useEffect } from "react";

const Intro = () => {
  // Track client-side mount to prevent hydration issues
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-xai-lightcyan via-xai-nonphoto2 to-white dark:from-xai-federal dark:via-xai-marian dark:to-xai-honolulu">
  

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 md:py-12 lg:py-16">
        {/* Hero Section */}
        <section className="relative min-h-[500px] sm:min-h-[600px] md:min-h-[700px] flex items-center justify-center mt-6 sm:mt-10 md:mt-20 overflow-hidden rounded-2xl sm:rounded-3xl">
          {/* Pixel Blast Background - Only render after mount to prevent SSR issues */}
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-xai-nonphoto2 via-xai-nonphoto to-white dark:from-xai-marian dark:via-xai-honolulu dark:to-xai-bluegreen">
            {isMounted && (
              <PixelBlast
                color="#0077b6"
                pixelSize={5}
                variant="circle"
                patternScale={1}
                patternDensity={1.3}
                speed={0.5}
                enableRipples={true}
                rippleIntensityScale={1.2}
                edgeFade={0.3}
                transparent={true}
              />
            )}
          </div>

          {/* Content - Always visible, no initial opacity animation */}
          <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-10 sm:px-6 sm:py-12 md:px-12 md:py-16 lg:px-16 lg:py-20">
            <motion.div
              initial={isMounted ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="text-center space-y-4 sm:space-y-6 md:space-y-8"
            >
              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-instrument font-bold tracking-tight text-xai-federal dark:text-xai-lightcyan px-2">
                See AI with XeeAI
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-inter text-xai-marian dark:text-xai-nonphoto max-w-3xl mx-auto leading-relaxed px-4">
                Breaking down Black-Box complexity with LIME Algorithm
              </p>

              {/* CTA Button */}
              <div className="flex justify-center pt-2 sm:pt-4">
                <Link href="/chatbot">
                  <Button className="bg-xai-honolulu hover:bg-xai-marian text-white text-sm sm:text-base md:text-lg px-6 py-5 sm:px-8 sm:py-6 md:px-10 md:py-7 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 dark:bg-xai-pacific dark:hover:bg-xai-vivid">
                    Get Started
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <section>
          <HowItWorks />
        </section>

        <section>
          <ExplainabilitySection />
        </section>

        <section>
          <WhyChooseUs />
        </section>

        <MaskedEffect />

        <section>
          <TeamSection />
        </section>
      </main>
    </div>
  );
};

export default Intro;
