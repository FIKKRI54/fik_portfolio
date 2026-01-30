"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent, useTransform } from "framer-motion";

const FRAME_COUNT = 240;

export default function SequenceScroll() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loadedCount, setLoadedCount] = useState(0);
    const targetRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"],
    });

    // Preload Images
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let loadCounter = 0;

        for (let i = 1; i <= FRAME_COUNT; i++) {
            const img = new Image();
            // Pad with zeros: frame-001, frame-010, frame-100
            const frameNumber = i.toString().padStart(3, "0");
            img.src = `/sequence/cyber-frame-${frameNumber}.jpg`;

            img.onload = () => {
                loadCounter++;
                setLoadedCount(loadCounter);
            };
            loadedImages.push(img);
        }
        setImages(loadedImages);
    }, []);

    // Render on Scroll
    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas || !images[index]) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Clear and Draw
        const img = images[index];

        // Scale to cover
        // We want object-fit: cover behavior
        const w = canvas.width;
        const h = canvas.height;
        const imgW = img.width;
        const imgH = img.height;

        const scale = Math.max(w / imgW, h / imgH);
        const x = (w - imgW * scale) / 2;
        const y = (h - imgH * scale) / 2;

        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(img, x, y, imgW * scale, imgH * scale);
    };

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (images.length === 0) return;
        const frameIndex = Math.min(
            FRAME_COUNT - 1,
            Math.floor(latest * FRAME_COUNT)
        );
        requestAnimationFrame(() => renderFrame(frameIndex));
    });

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                // Re-render current frame if possible? 
                // We'll rely on next scroll event or just let it be for now
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize(); // Initial size
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div ref={targetRef} className="relative h-[400vh] bg-neutral-950">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas ref={canvasRef} className="w-full h-full block" />

                {/* Loading Indicator (Optional override if needed) */}
                {loadedCount < FRAME_COUNT && (
                    <div className="absolute inset-0 flex items-center justify-center text-copper z-50 bg-black/50">
                        <span className="font-mono text-xl">
                            SYSTEM INITIALIZING... {Math.round((loadedCount / FRAME_COUNT) * 100)}%
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
