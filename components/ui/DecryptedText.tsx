"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface DecryptedTextProps {
    text: string;
    speed?: number;
    maxIterations?: number;
    className?: string;
    parentClassName?: string;
    animateOn?: "view" | "hover";
    revealDirection?: "start" | "end" | "center";
}

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

export default function DecryptedText({
    text,
    speed = 50,
    maxIterations = 10,
    className = "",
    parentClassName = "",
    animateOn = "hover",
    revealDirection = "start",
}: DecryptedTextProps) {
    const [displayText, setDisplayText] = useState(text);
    const [isHovering, setIsHovering] = useState(false);
    const [isScrolledIntoView, setIsScrolledIntoView] = useState(false);
    const containerRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        let iteration = 0;

        const startAnimation = () => {
            iteration = 0;
            clearInterval(interval);

            interval = setInterval(() => {
                setDisplayText(prev =>
                    text.split("").map((letter, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return characters[Math.floor(Math.random() * characters.length)];
                    }).join("")
                );

                if (iteration >= text.length) {
                    clearInterval(interval);
                }

                iteration += 1 / maxIterations * text.length;
            }, speed);
        };

        if (animateOn === "view" && isScrolledIntoView) {
            startAnimation();
        } else if (animateOn === "hover" && isHovering) {
            startAnimation();
        } else {
            // Reset to original text if needed or keep it static
            setDisplayText(text);
        }

        return () => clearInterval(interval);
    }, [isHovering, isScrolledIntoView, text, speed, maxIterations, animateOn]);

    useEffect(() => {
        if (animateOn !== "view") return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsScrolledIntoView(true);
                    observer.disconnect(); // Animate once
                }
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [animateOn]);


    return (
        <span
            ref={containerRef}
            className={`inline-block whitespace-nowrap ${parentClassName}`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <span className={className}>{displayText}</span>
        </span>
    );
}
