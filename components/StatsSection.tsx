"use client";

import { motion, useSpring, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

function Counter({ value, label }: { value: number; label: string }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { stiffness: 50, damping: 20 });

    // Format helper
    const rounded = useTransform(springValue, (latest) => {
        if (value % 1 !== 0) return latest.toFixed(1); // decimal support
        return Math.round(latest);
    });

    useEffect(() => {
        if (inView) {
            motionValue.set(value);
        }
    }, [inView, value, motionValue]);

    return (
        <div ref={ref} className="text-center">
            <motion.div className="text-6xl md:text-8xl font-bold text-white font-mono tracking-tighter">
                {/* We just render the localized string in a real app, but Framer motion text requires a bit more setup for pure number tweening. For simplicity we use the spring value directly if possible or just text content */}
                <motion.span>{rounded}</motion.span>
            </motion.div>
            <p className="text-copper mt-4 text-sm md:text-lg uppercase tracking-widest">{label}</p>
        </div>
    );
}

export default function StatsSection() {
    return (
        <section className="py-32 bg-neutral-950 border-t border-neutral-900 relative z-10">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                <Counter value={1.2} label="Petaflops" />
                <Counter value={240} label="Refresh Rate (Hz)" />
                <Counter value={0.4} label="Latency (ms)" />
            </div>
        </section>
    );
}
