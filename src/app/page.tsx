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
      <SectionReveal delay={0}>
        <About />
      </SectionReveal>
      <SectionReveal delay={100}>
        <Skills />
      </SectionReveal>
      <SectionReveal delay={0}>
        <Projects />
      </SectionReveal>
      <SectionReveal delay={100}>
        <Contact />
      </SectionReveal>
    </main>
  );
}
