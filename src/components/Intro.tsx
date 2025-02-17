import { Button } from "@/components/ui/button";
import Link from "next/link";

const Intro = () => {
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <main className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-6 mt-20">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Bringing{" "}
              <span className="text-blue-500 relative">
                Clarity
                <div className="absolute -bottom-1 left-0 w-full h-1 bg-blue-500/30 rounded-full" />
              </span>
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mt-4">
              to AI decisions
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
              Understand the &apos;why&apos; behind AI decisions. Our system
              ensures clarity and transparency by explaining every AI decision
              in a way you can trust.
            </p>
            <Link href="/chatbot">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600 mt-5">
                Get Started
              </Button>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Intro;
