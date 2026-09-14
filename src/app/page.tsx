import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Categories, PairingAndQuality } from "@/components/Categories";
import { Portfolio } from "@/components/Portfolio";
import { Insights } from "@/components/Insights";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { DynamicInteractiveBackground } from "@/components/DynamicInteractiveBackground";

export default function Home() {
  return (
    <>
      <ScrollReveal />
      <DynamicInteractiveBackground />
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Categories />
        <Portfolio />
        <PairingAndQuality />
        <Insights />
      </main>
      <Footer />
    </>
  );
}
