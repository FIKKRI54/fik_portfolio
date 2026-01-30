"use client";

import { motion } from "framer-motion";

export default function BentoGrid() {
    return (
        <section className="min-h-screen bg-neutral-950 py-20 px-4 md:px-20 relative z-10 flex flex-col justify-center">
            <div className="max-w-7xl mx-auto w-full">
                <h3 className="text-white text-4xl md:text-6xl font-bold mb-16 uppercase tracking-tighter">
                    Architecture <span className="text-copper">Deep Dive</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[120vh] md:h-[80vh]">

                    {/* Large Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="md:col-span-2 row-span-2 relative rounded-3xl overflow-hidden group border border-neutral-800 bg-neutral-900"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                        {/* Placeholder for macro shot */}
                        <div className="w-full h-full bg-neutral-800 animate-pulse group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute bottom-8 left-8 z-20">
                            <h4 className="text-2xl font-bold text-white">Neural Core V9</h4>
                            <p className="text-neutral-400">7nm Architecture process.</p>
                        </div>
                    </motion.div>

                    {/* Small Card 1 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="relative rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900 group"
                    >
                        <div className="absolute bottom-6 left-6 z-20">
                            <h4 className="text-xl font-bold text-white">Haptic Feedback</h4>
                        </div>
                        <div className="w-full h-full bg-neutral-800/50 group-hover:bg-copper/10 transition-colors duration-500" />
                    </motion.div>

                    {/* Small Card 2 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="relative rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900 group"
                    >
                        <div className="absolute bottom-6 left-6 z-20">
                            <h4 className="text-xl font-bold text-white">Latency < 1ms</h4>
                        </div>
                        <div className="w-full h-full bg-neutral-800/50 group-hover:bg-copper/10 transition-colors duration-500" />
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
