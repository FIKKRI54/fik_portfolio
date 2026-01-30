"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const testimonials = [
    {
        quote: "The latency is non-existent. It feels like an extension of my own nervous system.",
        author: "Dr. Aris Thorne",
        role: "Neural Architect",
    },
    {
        quote: "We've never seen processing power this dense. It's not just faster, it's clairvoyant.",
        author: "Sarah Jenko",
        role: "Lead Systems Engineer",
    },
    {
        quote: "Neuralis redefined the boundaries of human-machine interaction.",
        author: "Kaelen Vex",
        role: "Cyber-Psychologist",
    },
];

export default function TestimonialSlider() {
    const [index, setIndex] = useState(0);

    const next = () => setIndex((i) => (i + 1) % testimonials.length);
    const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

    return (
        <section className="min-h-screen flex items-center justify-center bg-black relative z-10">
            <div className="max-w-6xl mx-auto px-4 w-full">
                <h3 className="text-copper text-sm font-mono mb-20 uppercase tracking-widest text-center">User Feedback Data</h3>

                <div className="relative overflow-hidden min-h-[400px] flex items-center">
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5 }}
                        className="text-center w-full"
                    >
                        <p className="text-3xl md:text-6xl font-light italic leading-tight mb-12 text-neutral-300">
                            "{testimonials[index].quote}"
                        </p>
                        <div>
                            <h4 className="text-xl font-bold text-white uppercase">{testimonials[index].author}</h4>
                            <p className="text-copper tracking-widest text-sm mt-2">{testimonials[index].role}</p>
                        </div>
                    </motion.div>
                </div>

                <div className="flex justify-center gap-4 mt-8">
                    <button onClick={prev} className="p-4 border border-neutral-800 rounded-full hover:bg-neutral-800 transition-colors text-white">&larr;</button>
                    <button onClick={next} className="p-4 border border-neutral-800 rounded-full hover:bg-neutral-800 transition-colors text-white">&rarr;</button>
                </div>
            </div>
        </section>
    );
}
