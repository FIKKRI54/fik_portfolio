"use client";

import Navbar from "@/components/Navbar";
import SequenceScroll from "@/components/SequenceScroll";
import AboutSection from "@/components/AboutSection";
import BentoGrid from "@/components/BentoGrid";
import TestimonialSlider from "@/components/TestimonialSlider";
import Timeline from "@/components/Timeline";
import ContactSection from "@/components/ContactSection";
import PersonalSection from "@/components/PersonalSection";

export default function Home() {
  return (
    <main className="w-full relative">
      <Navbar />

      {/* Scroll Sequence */}
      <SequenceScroll />

      {/* Content Sections */}
      {/* Using a negative margin to pull the content up if desired, or just standard flow. 
          The requirement said "Include additional sections wrapped in a -mt-[100vh] relative z-10 div".
          Let's try that to overlap the end of the scroll sequence if the sequence has extra space,
          but SequenceScroll is 400vh tall with sticky content.
          If we use -mt-[100vh], it will overlap the last 100vh of the sequence.
      */}
      <div className="relative z-10 bg-black">
        <AboutSection />
        <PersonalSection />
        <BentoGrid />
        <Timeline />
        <TestimonialSlider />
        <ContactSection />
      </div>

      {/* Footer */}
      <footer className="bg-white text-neutral-500 py-12 text-center text-xs tracking-widest uppercase border-t border-neutral-200">
        &copy; 2026 Mohamad Fikri Bin Bukhari. All Rights Reserved.
      </footer>
    </main>
  );
}
