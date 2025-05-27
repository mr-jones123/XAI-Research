"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FlipWords } from "@/components/ui/flip-words";
import MaskedEffect from "@/components/MaskedEffect";
import HowItWorks from "./HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";
import ExplainabilitySection from "./ExplainabilitySection";
import TeamSection from "./TeamSection";
import { useToast } from "@/hooks/use-toast"
import { useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const Intro = () => {
  const words = ["Transparency", "Interpretability", "Explainability"];
  const { toast } = useToast();
  const router = useRouter();
  const supabase = createClient();

  const handleGetStarted = async (e: React.MouseEvent) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access the chatbot",
        variant: "destructive",
      });
    } else {
      router.push("/chatbot");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <main className="container mx-auto px-4 py-8 md:py-16 lg:py-24">
        <section className="max-w-3xl mx-auto text-center space-y-4 md:space-y-6 mt-10 md:mt-20">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight">
            Bringing{" "}
            <span className="relative">
              <FlipWords words={words} />
              <div className="absolute -bottom-1 left-0 w-full h-1 bg-blue-500/30 rounded-full" />
            </span>
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mt-2 md:mt-4">
            to AI decisions
          </h2>
          <p className="text-gray-600 font-geist text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-2">
            Understand the &apos;why&apos; behind AI decisions. XeeAI ensures
            clarity and transparency by explaining every AI decision in a way
            you can trust.
          </p>
          <div className="flex justify-center space-x-11">
            <Link href="/chatbot">
              <Button className="bg-blue-500 hover:bg-blue-600 mt-4 md:mt-5 text-sm md:text-base px-4 py-2 md:px-6 md:py-2.5" onClick={handleGetStarted}>
                Get Started
              </Button>
            </Link>
            <Link href="https://acm-0353f194.mintlify.app/prompt-cookbook">
              <Button className="bg-blue-500 hover:bg-blue-600 mt-4 md:mt-5 text-sm md:text-base px-4 py-2 md:px-6 md:py-2.5">
                User Manual
              </Button>
            </Link>
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
