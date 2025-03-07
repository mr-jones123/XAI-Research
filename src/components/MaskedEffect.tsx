"use client";
import { MaskContainer } from "./ui/svg-mask-effect";

export default function MaskedEffect() {
  return (
    <div className="h-[40rem] w-full flex items-center justify-center  overflow-hidden">
      <MaskContainer
        revealText={
          <p className="max-w-4xl mx-auto text-black text-center  text-4xl font-necro">
            XeeAI let&apos;s you see under hood of AI.
          </p>
        }
        className="h-[40rem] w-full"
      >
        <span className="bg-blue-600 text-white p-2">XeeAI</span> let&apos;s you see under hood of <span className="bg-blue-600 text-white p-2">AI.</span>
      </MaskContainer>
    </div>
  );
}
