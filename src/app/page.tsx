import Hero from "./components/Hero";
import About from "./components/About";
import Project from "./components/Project";
import Contact from "./Contact";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <About />
      <Project />
      <Contact />
    </main>
  );
}