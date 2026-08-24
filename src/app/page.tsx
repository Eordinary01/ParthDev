import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Project";
import Contact from "./Contact";
import SectionReveal from "./components/SectionReveal";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <SectionReveal delay={0} variant="tilt">
        <About />
      </SectionReveal>
      <SectionReveal delay={80} variant="scale">
        <Skills />
      </SectionReveal>
      <SectionReveal delay={0} variant="clip">
        <Projects />
      </SectionReveal>
      <SectionReveal delay={100} variant="tilt">
        <Contact />
      </SectionReveal>
    </main>
  );
}
