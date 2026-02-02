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
        return Math.round(latest).toString();
    });

    useEffect(() => {
        const unsubscribe = rounded.on("change", (v) => {
            if (ref.current) {
                // @ts-ignore
                ref.current.textContent = v;
            }
        });
        return unsubscribe;
    }, [rounded]);

    useEffect(() => {
        if (inView) {
            motionValue.set(value);
        }
    }, [inView, value, motionValue]);

    return (
        <div className="text-center">
            <div className="text-6xl md:text-8xl font-bold text-black font-mono tracking-tighter">
                <span ref={ref}>0</span>
            </div>
            <p className="text-neutral-500 mt-4 text-sm md:text-lg uppercase tracking-widest">{label}</p>
        </div>
    );
}

export default function StatsSection() {
    return (
        <section className="py-32 bg-white border-t border-neutral-200 relative z-10">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                <Counter value={3.21} label="CGPA (Bachelor)" />
                <Counter value={4} label="MUET Band" />
                <Counter value={4} label="Years Experience" />
            </div>
        </section>
    );
}
