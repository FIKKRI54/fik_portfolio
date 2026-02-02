"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltedCardProps {
    children: React.ReactNode;
    className?: string;
    containerHeight?: string | number;
    containerWidth?: string | number;
    imageSrc?: string;
    altText?: string;
    captionText?: string;
    showTooltip?: boolean;
    scaleOnHover?: number;
    rotateAmplitude?: number;
    showMobileWarning?: boolean;
}

export default function TiltedCard({
    children,
    className = "",
    containerHeight = "300px",
    containerWidth = "100%",
    scaleOnHover = 1.05,
    rotateAmplitude = 12,
    showMobileWarning = false,
}: TiltedCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 30, damping: 10 });
    const mouseY = useSpring(y, { stiffness: 30, damping: 10 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [rotateAmplitude, -rotateAmplitude]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-rotateAmplitude, rotateAmplitude]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXCurrent = e.clientX - rect.left;
        const mouseYCurrent = e.clientY - rect.top;

        const xPct = (mouseXCurrent / width - 0.5);
        const yPct = (mouseYCurrent / height - 0.5);

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            className={`relative preserve-3d transition-all duration-200 ease-out ${className}`}
            style={{
                width: containerWidth,
                height: containerHeight,
                perspective: "1000px",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                className="w-full h-full"
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                whileHover={{ scale: scaleOnHover }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
}
