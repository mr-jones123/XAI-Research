"use client";
"use client";
import { MaskContainer } from "./ui/svg-mask-effect";

export default function MaskedEffect() {
  return (
    <div className="h-[20rem] sm:h-[30rem] md:h-[40rem] w-full flex items-center justify-center overflow-hidden">
      <MaskContainer
        revealText={
          <p className="max-w-4xl mx-auto text-black text-center text-2xl sm:text-3xl md:text-4xl font-necro px-4">
            XeeAI let&apos;s you see under hood of AI.
          </p>
        }
        className="h-[20rem] sm:h-[30rem] md:h-[40rem] w-full"
      >
        <span className="bg-xai-honolulu dark:bg-xai-marian text-white p-2 relative">
          XeeAI{" "}
          <span className="absolute -bottom-1 left-0 right-0 h-1 font-geist text-[1.5rem]">
            0.69
          </span>
        </span>
        let&apos;s you see under hood of{" "}
        <span className="bg-xai-pacific dark:bg-xai-vivid text-white p-2 relative">
          AI.{" "}
          <span className="absolute -bottom-1  left-0 right-0 h-1 font-geist text-[1.5rem]">
            0.42
          </span>
        </span>
      </MaskContainer>
    </div>
  );
}
