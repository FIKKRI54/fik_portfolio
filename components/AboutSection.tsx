"use client";

import { motion } from "framer-motion";
import Lanyard from "./ui/Lanyard";

export default function AboutSection() {
    const text = "Mohamad Fikri Bin Bukhari,I am a Final-year Computer Science student seeking an internship placement. Possesses strong communication and leadership skills with a proven ability to work in teams to build full-stack web, system, AI model and mobile applications.";
    const words = text.split(" ");

    return (
        <section id="about" className="min-h-screen flex items-center justify-center py-20 px-4 md:px-20 relative z-10 -mt-8" style={{ backgroundColor: '#E8ECED' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto w-full">
                <div className="text-left">
                    <h3 className="text-neutral-500 text-sm font-mono mb-8 uppercase tracking-widest">About Me</h3>
                    <p className="text-xl md:text-5xl font-medium leading-tight text-neutral-400 flex flex-wrap gap-x-1.5 md:gap-x-3">
                        {words.map((word, i) => (
                            <motion.span
                                key={i}
                                whileInView={{ opacity: 1, color: "#171717" }}
                                viewport={{ margin: "-100px" }}
                                transition={{ duration: 0.5, delay: i * 0.02 }}
                                className="transition-colors duration-300"
                            >
                                {word}
                            </motion.span>
                        ))}
                    </p>
                </div>

                {/* Lanyard Interactive Element */}
                <div className="h-[800px] flex items-center justify-center relative bg-neutral-950 rounded-3xl border border-neutral-800 overflow-hidden">
                    <Lanyard />
                </div>
            </div>
        </section>
    );
}
