import About from "@/components/About";
import Intro from "@/components/Intro";
export default function Home() {
  return (
    <div className="h-screen scroll-smooth">
      <section>
        <Intro />
      </section>
      <section id="about">
        <About />
      </section>
    </div>
  );
}
