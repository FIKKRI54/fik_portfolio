"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const menuVariants = {
        closed: { opacity: 0, scale: 0.95 },
        open: { opacity: 1, scale: 1 },
    };

    const linkVariants = {
        closed: { y: 20, opacity: 0 },
        open: (i: number) => ({
            y: 0,
            opacity: 1,
            transition: { delay: 0.1 * i, type: "spring", stiffness: 300, damping: 24 },
        }),
    };

    const navLinks = ["Neural Architecture", "System Specs", "Testimonial", "Initialize"];

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center mix-blend-difference text-white">
                <div className="text-2xl font-bold tracking-tighter uppercase cursor-pointer">
                    Neuralis
                </div>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="group flex flex-col items-end gap-1.5 cursor-pointer"
                >
                    <span className={`h-[2px] bg-white transition-all duration-300 ${isOpen ? "w-8 rotate-45 translate-y-2" : "w-8"}`} />
                    <span className={`h-[2px] bg-white transition-all duration-300 ${isOpen ? "w-8 opacity-0" : "w-6 group-hover:w-8"}`} />
                    <span className={`h-[2px] bg-white transition-all duration-300 ${isOpen ? "w-8 -rotate-45 -translate-y-2" : "w-4 group-hover:w-8"}`} />
                </button>
            </nav>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        className="fixed inset-0 bg-neutral-950 z-40 flex items-center justify-center pointer-events-auto"
                    >
                        <div className="flex flex-col items-center gap-8">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link}
                                    href="#"
                                    custom={i}
                                    variants={linkVariants}
                                    className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500 hover:to-copper transition-all cursor-pointer uppercase tracking-tighter"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link}
                                </motion.a>
                            ))}
                        </div>
                        {/* Background decoration */}
                        <div className="absolute inset-0 -z-10 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-800 via-neutral-950 to-black" />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
