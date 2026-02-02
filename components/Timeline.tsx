"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const events = [
    {
        year: "2024 - Present",
        title: "Bachelor of Computer Science (Hons.)",
        subtitle: "University Teknologi Mara (UiTM) Kuala Terengganu",
        description: "Researching RoBERTa-CNN hybrid models for sentiment analysis in Malaysian medical tourism. Experienced project leader in AI, image processing, and Oracle-based web systems. Also experienced as a speaker for SULAM (Service Learning Malaysia-University for Society), sharing knowledge on Computer Science and AI with the community.",
        side: "left"
    },
    {
        year: "2021 - 2024",
        title: "Diploma of Computer Science",
        subtitle: "University Teknologi Mara (UiTM) Machang",
        description: "Graduated with CGPA of 3.21 and MUET Band 4, leading a variety of technical projects throughout my diploma program including end-to-end system and database design, as well as web and mobile application development.",
        side: "right"
    },
    {
        year: "2016 - 2020",
        title: "Major of Accounting and Business",
        subtitle: "Sekolah Menengah Kebangsaan Long Ghafar",
        description: "Achieved excellent SPM results with 4 A's and 5 B's while actively leading the Art Club as President to organize school-level exhibitions and workshops.",
        side: "left"
    }
];

export default function Timeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section id="education" ref={containerRef} className="py-24 bg-neutral-950 text-white overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 md:px-20">
                <h3 className="text-4xl md:text-6xl font-bold mb-20 text-center uppercase tracking-tighter">
                    Education
                </h3>

                <div className="relative">
                    {/* Central Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-neutral-800 -translate-x-1/2">
                        <motion.div
                            style={{ height: lineHeight }}
                            className="w-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 origin-top"
                        />
                    </div>

                    {/* Events */}
                    <div className="space-y-24">
                        {events.map((event, index) => (
                            <TimelineItem key={index} event={event} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function TimelineItem({ event, index }: { event: any, index: number }) {
    const isLeft = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`flex items-center justify-between w-full ${isLeft ? "flex-row" : "flex-row-reverse"}`}
        >
            {/* Content Side */}
            <div className={`w-[45%] ${isLeft ? "text-right pr-8" : "text-left pl-8"}`}>
                <h4 className="text-3xl font-bold mb-2">{event.year}</h4>
                <h5 className="text-xl font-semibold text-neutral-300 mb-1">{event.title}</h5>
                <p className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-4">{event.subtitle}</p>
                <p className="text-neutral-400 leading-relaxed max-w-md ml-auto">{event.description}</p>
            </div>

            {/* Dot on Line */}
            <div className="relative z-10 w-4 h-4 rounded-full bg-black border-2 border-white flex-shrink-0">
                <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-20" />
            </div>

            {/* Empty Side for Balance */}
            <div className="w-[45%]" />
        </motion.div>
    );
}
