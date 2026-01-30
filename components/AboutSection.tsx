"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
    const text = "Neuralis isn't just hardware. It's an extension of your consciousness. Precision-engineered neural interfaces designed to bridge the gap between biological thought and digital execution.";
    const words = text.split(" ");

    return (
        <section className="min-h-screen bg-black flex items-center justify-center py-20 px-4 md:px-20 relative z-10">
            <div className="max-w-4xl text-left">
                <h3 className="text-copper text-sm font-mono mb-8 uppercase tracking-widest">System Overview</h3>
                <p className="text-3xl md:text-5xl font-medium leading-tight text-neutral-500 flex flex-wrap gap-x-3">
                    {words.map((word, i) => (
                        <motion.span
                            key={i}
                            whileInView={{ opacity: 1, color: "#fff" }}
                            viewport={{ margin: "-100px" }}
                            transition={{ duration: 0.5, delay: i * 0.02 }}
                            className="transition-colors duration-300"
                        >
                            {word}
                        </motion.span>
                    ))}
                </p>
            </div>
        </section>
    );
}
