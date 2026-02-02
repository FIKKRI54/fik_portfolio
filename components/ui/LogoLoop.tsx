"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

interface LogoLoopProps {
    items: { name?: string; icon?: React.ReactNode }[];
    direction?: "left" | "right";
    speed?: number;
}

export default function LogoLoop({ items, direction = "left", speed = 20 }: LogoLoopProps) {
    // Memoize duplicated items to prevent re-calculation on every render
    const duplicatedItems = useMemo(() => [...items, ...items, ...items, ...items], [items]); // Quadruple for smooth loop

    return (
        <div className="flex overflow-hidden w-full logo-loop-mask">
            <motion.div
                className="flex gap-16 min-w-max px-8"
                animate={{
                    x: direction === "left" ? ["0%", "-25%"] : ["-25%", "0%"],
                }}
                transition={{
                    duration: speed,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "loop",
                }}
                style={{ willChange: "transform" }} // GPU acceleration hint
            >
                {duplicatedItems.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-4 opacity-70 hover:opacity-100 transition-opacity"
                    >
                        {item.icon && <span className="text-4xl md:text-5xl text-neutral-800">{item.icon}</span>}
                        {item.name && (
                            <span className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-black to-neutral-500 uppercase tracking-tighter whitespace-nowrap">
                                {item.name}
                            </span>
                        )}
                    </div>
                ))}
            </motion.div>
            <style jsx>{`
                .logo-loop-mask {
                    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                    -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                }
            `}</style>
        </div>
    );
}
