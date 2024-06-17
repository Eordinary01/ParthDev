import Image from "next/image";
import About from "./components/About";
import Project from "./components/Project";
import Contact from "./Contact";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <About/>
      <Project/>
      <Contact/>
    </main>
  );
}
