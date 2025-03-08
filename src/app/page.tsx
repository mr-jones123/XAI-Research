import About from "@/components/About";
import Intro from "@/components/Intro";
import FooterSection from "@/components/FooterSection";
export default function Home() {
  return (
    <div className="h-screen scroll-smooth">
      <section>
        <Intro />
      </section>
      <section id="about">
        <About />
      </section>
      <section>
        <FooterSection/>
      </section>
    </div>
  );
}
