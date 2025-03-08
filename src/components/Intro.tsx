import { Button } from "@/components/ui/button";
import { ContainerScroll } from "./ui/container-scroll-animation";
import Link from "next/link";
import Image from "next/image";
import { FlipWords } from "@/components/ui/flip-words";
import MaskedEffect from "@/components/MaskedEffect";
const Intro = () => {
  const words = ["Transparency", "Interpretability", "Explainability"];
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <main className="container mx-auto px-4 py-16 md:py-24">
          <section className="max-w-3xl mx-auto text-center space-y-6 mt-20">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Bringing{" "}
              <span className="relative">
                <FlipWords words={words} />
                <div className="absolute -bottom-1 left-0 w-full h-1 bg-blue-500/30 rounded-full" />
              </span>
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mt-4">
              to AI decisions
            </h2>
            <p className="text-gray-600 font-geist text-lg md:text-xl max-w-2xl mx-auto">
              Understand the &apos;why&apos; behind AI decisions. XeeAI ensures
              clarity and transparency by explaining every AI decision in a way
              you can trust.
            </p>
            <Link href="/chatbot">
              <Button className="bg-blue-500 hover:bg-blue-600 mt-5">
                Get Started
              </Button> 
            </Link>
          </section>

          <section>
            <ContainerScroll>
              <Image
                src={"/ai-assistant.png"}
                width={200}
                height={200}
                alt="Si Aiverson"
              />
            </ContainerScroll>
          </section>

          <MaskedEffect />
        </main>
      </div>
    </div>
  );
};

export default Intro;
