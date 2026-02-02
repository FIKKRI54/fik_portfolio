"use client";

import { motion } from "framer-motion";

interface ShinyTextProps {
    text: string;
    className?: string;
    shimmerColor?: string;
    baseColor?: string;
    duration?: number;
}

export default function ShinyText({
    text,
    className = "",
    shimmerColor = "#ffffff",
    baseColor = "#737373", // neutral-500
    duration = 2.5
}: ShinyTextProps) {
    return (
        <span className={`relative inline-block overflow-hidden ${className}`} style={{ color: baseColor }}>
            {text}
            <motion.span
                className="absolute top-0 left-0 w-full h-full text-transparent pointer-events-none"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: duration,
                    ease: "linear",
                    repeatDelay: 0.5
                }}
                style={{
                    backgroundImage: `linear-gradient(90deg, transparent 0%, ${shimmerColor} 50%, transparent 100%)`,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    backgroundSize: "50% 100%",
                    backgroundRepeat: "no-repeat"
                }}
            >
                {text}
            </motion.span>
        </span>
    );
}
