"use client";

import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import WhyKonfig from "@/components/home/WhyKonfig";
import TerminalGrid from "@/components/home/TerminalGrid";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <HowItWorks />
      <WhyKonfig />
      <TerminalGrid />
      <Footer />
    </div>
  );
}
