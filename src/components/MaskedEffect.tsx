import { MaskContainer } from "./ui/svg-mask-effect";

export default function MaskedEffect() {
return (
  <MaskContainer
    revealText={
      <p className="max-w-4xl mx-auto text-center text-black text-4xl font-bold">
         XeeAI let&apos;s you see under the hood.
      </p>
    }
    className="h-[40rem]"
  >
    <span className=" bg-blue-700 text-white p-2">XeeAI</span> let&apos;s you see under the <span className="bg-blue-700 text-white p-2">hood.</span>
  </MaskContainer>
)
}
