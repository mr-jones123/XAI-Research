import About from "@/components/About";
import Intro from "@/components/Intro";
export default function Home() {
  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory scrollbar-hide">
      <section className="snap-start">
        <Intro />
      </section>
      <section className="snap-start">
        <About />
      </section>
    </div>
  );
}
