"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion, useSpring, useTransform, useMotionTemplate } from "framer-motion";

interface MagicCardProps {
    children: React.ReactNode;
    className?: string;
    gradientColor?: string;
    gradientColor2?: string;
    gradientSize?: number;
    gradientOpacity?: number;
}

export default function MagicCard({
    children,
    className = "",
    gradientColor = "#D4D4D8", // Silver-gray
    gradientColor2,
    gradientSize = 400,
    gradientOpacity = 0.5,
}: MagicCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [clickEffect, setClickEffect] = useState<{ x: number; y: number; id: number }[]>([]);

    // Mouse position for Spotlight
    const mouseX = useSpring(0, { bounce: 0 });
    const mouseY = useSpring(0, { bounce: 0 });

    // Tilt Values
    const x = useSpring(0, { stiffness: 150, damping: 15 });
    const y = useSpring(0, { stiffness: 150, damping: 15 });

    // Transform logic
    const rotateX = useTransform(y, [-0.5, 0.5], ["15deg", "-15deg"]); // Reverse axis for tilt
    const rotateY = useTransform(x, [-0.5, 0.5], ["-15deg", "15deg"]);

    // Magnetism (Shift whole card slightly)
    const cardX = useTransform(x, [-0.5, 0.5], [-10, 10]);
    const cardY = useTransform(y, [-0.5, 0.5], [-10, 10]);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const clientX = e.clientX - rect.left;
        const clientY = e.clientY - rect.top;

        // Spotlight update
        mouseX.set(clientX);
        mouseY.set(clientY);

        // Tilt & Magnetism update (-0.5 to 0.5 normalized range)
        const xPct = (clientX / width) - 0.5;
        const yPct = (clientY / height) - 0.5;
        x.set(xPct);
        y.set(yPct);
    }, [mouseX, mouseY, x, y]);

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const newClick = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            id: Date.now()
        };
        setClickEffect((prev) => [...prev, newClick]);

        // Cleanup click effect
        setTimeout(() => {
            setClickEffect((prev) => prev.filter(p => p.id !== newClick.id));
        }, 600);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            style={{
                rotateX,
                rotateY,
                x: cardX,
                y: cardY,
                transformStyle: "preserve-3d",
            }}
            className={`
                relative h-full w-full rounded-2xl border transition-all duration-200
                bg-neutral-100 backdrop-blur-sm
                shadow-sm hover:shadow-xl
                ${className}
            `}
        >
            {/* 1. Stars Effect Background */}
            <div className={`absolute inset-0 z-0 transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-30"}`}>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                {/* Simulated Stars with CSS radial gradients */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
                            radial-gradient(1px 1px at 10% 10%, #C0C0C0 1px, transparent 0),
                            radial-gradient(1px 1px at 20% 30%, #C0C0C0 1px, transparent 0),
                            radial-gradient(2px 2px at 40% 70%, #A9A9A9 1px, transparent 0),
                            radial-gradient(1px 1px at 60% 40%, #D3D3D3 1px, transparent 0),
                            radial-gradient(2px 2px at 80% 80%, #C0C0C0 1px, transparent 0),
                            radial-gradient(1px 1px at 90% 20%, #A9A9A9 1px, transparent 0)
                        `,
                        backgroundSize: '200px 200px'
                    }}
                />
            </div>

            {/* 2. Silver Spotlight Effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 z-10"
                style={{
                    opacity: isHovered ? 1 : 0,
                    background: useMotionTemplate`
                        radial-gradient(
                            ${gradientSize}px circle at ${mouseX}px ${mouseY}px,
                            ${gradientColor},
                            ${gradientColor2 ? gradientColor2 + "," : ""}
                            transparent 80%
                        )
                    `,
                }}
            />

            {/* 3. Click Ripple Effect */}
            {clickEffect.map((click) => (
                <span
                    key={click.id}
                    className="absolute rounded-full bg-neutral-400 opacity-20 pointer-events-none z-20 animate-ping"
                    style={{
                        left: click.x,
                        top: click.y,
                        width: "100px",
                        height: "100px",
                        transform: "translate(-50%, -50%)"
                    }}
                />
            ))}

            {/* Content with minimal Z-index to sit above BG but below interactions if needed */}
            <div className="relative z-30 h-full w-full p-1" style={{ transform: "translateZ(20px)" }}>
                {children}
            </div>
        </motion.div>
    );
}
