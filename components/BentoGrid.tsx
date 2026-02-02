"use client";

import { motion } from "framer-motion";
import MagicCard from "./ui/MagicCard";

export default function BentoGrid() {
    const experienceItems = [
        {
            title: "AI Sentiment Analysis Research",
            company: "Final Year Project",
            period: "2025 - Present",
            description: "Creating a sentiment analysis recommendation system for medical tourism in Malaysia using RoBERTa-CNN models. Managing data collection and training the AI model to understand different opinions.",
            className: "md:col-span-2",
            tags: ["AI Research", "RoBERTa-CNN", "Python"]
        },
        {
            title: "Full Stack Developer",
            company: "KKD PUSPAL (Isianpadu Systems)",
            period: "2023 - 2024",
            description: "Developed the front-end and created the back-end of the Foreign Film & Artist Performance module using Laravel and React.js. Improved site speed and performance to handle high traffic.",
            className: "md:col-span-1",
            tags: ["Laravel", "React.js", "Full Stack"]
        },
        {
            title: "IT Support",
            company: "e-Tauliah (Isianpadu Systems)",
            period: "2023 - 2024",
            description: "Fixed bugs in the digital teaching certificate system by working closely with IT staff. Kept the system running smoothly and helped users solve technical problems quickly.",
            className: "md:col-span-1",
            tags: ["System Support", "Bug Fixing"]
        },
        {
            title: "Full Stack Developer",
            company: "RISDA IPMIS (Isianpadu Systems)",
            period: "2023 - 2024",
            description: "Built server-side logic for a reporting system with ASP.NET framework. Designed a simple user interface and created routines to quickly find and show data.",
            className: "md:col-span-2",
            tags: ["ASP.NET", "C#", "SQL"]
        },
        {
            title: "Mobile Game Developer",
            company: "Personal Project",
            period: "2022",
            description: "Built an Android game using Java and Android Studio with hand-motion detection features. Integrated Firebase for live leaderboards and optimized graphics with Adobe Photoshop.",
            className: "md:col-span-1",
            tags: ["Java", "Android Studio", "Firebase"]
        },
        {
            title: "Web Developer",
            company: "Personal Project",
            period: "2022",
            description: "Created a food ordering website using PHP and MySQL. Built a secure login system and an easy-to-use design for browsing food items.",
            className: "md:col-span-2",
            tags: ["PHP", "MySQL", "Web Dev"]
        }
    ];

    return (
        <section id="experience" className="min-h-screen bg-neutral-50 py-20 px-4 md:px-20 relative z-10 flex flex-col justify-center">
            <div className="max-w-7xl mx-auto w-full">
                <h3 className="text-black text-4xl md:text-6xl font-bold mb-16 uppercase tracking-tighter">
                    My <span className="text-neutral-700">Experience</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
                    {experienceItems.map((item, index) => (
                        <div key={index} className={`${item.className} group`}>
                            <MagicCard
                                className="h-full w-full border-neutral-900/20 hover:border-black transition-colors"
                                gradientColor="#e4e4e7" // Zinc-200 (Silver)
                                gradientColor2="#a1a1aa" // Zinc-400 (Darker Silver)
                                gradientOpacity={0.5}
                            >
                                <div className="relative h-full w-full p-8 flex flex-col justify-between z-20">
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent z-10 pointer-events-none" />

                                    <div>
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="inline-block px-3 py-1 bg-black text-white text-xs rounded-full min-w-fit">{item.period}</span>
                                            {/* <span className="text-xs text-neutral-400 font-mono text-right">{item.company}</span> */}
                                        </div>

                                        <h4 className="text-2xl font-bold text-black mb-1">{item.title}</h4>
                                        <h5 className="text-sm font-semibold text-neutral-600 mb-4">{item.company}</h5>
                                        <p className="text-neutral-600 leading-relaxed text-sm mb-6 relative z-20">
                                            {item.description}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {item.tags.map((tag, i) => (
                                            <span key={i} className="text-[10px] uppercase tracking-wider text-neutral-500 border border-neutral-200 px-2 py-1 rounded">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </MagicCard>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
