import Intro from "@/components/Intro";
import FooterSection from "@/components/FooterSection";
export default function Home() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden scroll-smooth">
      <section>
        <Intro />
      </section>
      <section id="about"></section>
      <section>
        <FooterSection />
      </section>
    </div>
  );
}
