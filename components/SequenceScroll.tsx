"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useMotionValueEvent, useTransform, motion, AnimatePresence } from "framer-motion";

// Configuration
const DESKTOP_FRAME_COUNT = 240;
const MOBILE_FRAME_COUNT = 120; // Half frames on mobile for faster loading

// Check WebP support
const checkWebPSupport = (): Promise<boolean> => {
    return new Promise((resolve) => {
        const webP = new Image();
        webP.onload = webP.onerror = () => resolve(webP.height === 2);
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSywAAALpAAAD+O6f/rjlAAA=";
    });
};

export default function SequenceScroll() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [showIntro, setShowIntro] = useState(true);
    const [loadedCount, setLoadedCount] = useState(0);
    const [visualProgress, setVisualProgress] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [supportsWebP, setSupportsWebP] = useState(true);
    const targetRef = useRef<HTMLDivElement>(null);
    const lastFrameRef = useRef<number>(-1);
    const rafIdRef = useRef<number>(0);

    const frameCount = isMobile ? MOBILE_FRAME_COUNT : DESKTOP_FRAME_COUNT;

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"],
    });

    // Opacity Transforms for Text
    const opacity1 = useTransform(scrollYProgress, [0, 0.01], [1, 0]);
    const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.45], [0, 1, 0]);
    const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.75], [0, 1, 0]);
    const opacity4 = useTransform(scrollYProgress, [0.9, 1], [0, 1]);
    const scaleCTA = useTransform(scrollYProgress, [0.9, 1], [0.8, 1]);

    // Detect mobile and WebP support
    useEffect(() => {
        const checkDevice = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkDevice();
        window.addEventListener("resize", checkDevice);

        checkWebPSupport().then(setSupportsWebP);

        return () => window.removeEventListener("resize", checkDevice);
    }, []);

    // Preload Images with optimized loading
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let count = 0;
        const totalFrames = isMobile ? MOBILE_FRAME_COUNT : DESKTOP_FRAME_COUNT;
        const frameStep = isMobile ? 2 : 1; // Skip every other frame on mobile

        const updateCount = () => {
            count++;
            setLoadedCount(count);
        };

        // Use WebP images from optimized folder
        const extension = "webp";
        const basePath = "/sequence-webp";

        // Priority load first 30 frames
        const priorityFrames = 30;

        for (let i = 1; i <= DESKTOP_FRAME_COUNT; i += frameStep) {
            const img = new Image();
            const frameNumber = i.toString().padStart(3, "0");

            // Add loading priority for first frames
            if (i <= priorityFrames) {
                (img as any).fetchPriority = "high";
            }
            // IMPORTANT: Do NOT set loading="lazy" for preloaded images!
            // They need to load immediately into memory.

            // Try WebP first, fallback to JPG
            img.src = `${basePath}/ezgif-frame-${frameNumber}.${extension}`;

            // Fallback to JPG if WebP fails
            if (supportsWebP) {
                img.onerror = () => {
                    img.src = `/sequence/ezgif-frame-${frameNumber}.jpg`;
                    img.onload = updateCount;
                };
            }

            if (img.complete) {
                updateCount();
            } else {
                img.onload = updateCount;
                if (!supportsWebP) {
                    img.onerror = updateCount;
                }
            }

            loadedImages.push(img);
        }
        setImages(loadedImages);
    }, [isMobile, supportsWebP]);

    // Animate Visual Progress
    useEffect(() => {
        const target = Math.round((loadedCount / (isMobile ? MOBILE_FRAME_COUNT : DESKTOP_FRAME_COUNT)) * 100);

        if (visualProgress >= target) return;

        const interval = setInterval(() => {
            setVisualProgress(prev => {
                if (prev >= target) {
                    clearInterval(interval);
                    return prev;
                }
                return prev + 1;
            });
        }, 5);

        return () => clearInterval(interval);
    }, [loadedCount, visualProgress, isMobile]);

    // Optimized render with frame skipping for fast scrolling
    const renderFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        const img = images[index];

        if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

        const ctx = canvas.getContext("2d", { alpha: false }); // Disable alpha for performance
        if (!ctx) return;

        const w = canvas.width;
        const h = canvas.height;
        const imgW = img.width;
        const imgH = img.height;

        const scale = Math.max(w / imgW, h / imgH);
        const x = (w - imgW * scale) / 2;
        const y = (h - imgH * scale) / 2;

        ctx.drawImage(img, x, y, imgW * scale, imgH * scale);
    }, [images]);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest > 0.01 && showIntro) {
            setShowIntro(false);
        }

        if (images.length === 0) return;

        const frameIndex = Math.min(
            images.length - 1,
            Math.floor(latest * images.length)
        );

        // Skip render if same frame (performance optimization)
        if (frameIndex === lastFrameRef.current) return;
        lastFrameRef.current = frameIndex;

        // Cancel any pending frame render
        if (rafIdRef.current) {
            cancelAnimationFrame(rafIdRef.current);
        }

        rafIdRef.current = requestAnimationFrame(() => renderFrame(frameIndex));
    });

    // Handle Resize with debouncing
    useEffect(() => {
        let resizeTimeout: NodeJS.Timeout;

        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (canvasRef.current) {
                    // Use device pixel ratio for sharper rendering on high-DPI displays
                    const dpr = Math.min(window.devicePixelRatio || 1, 2);
                    canvasRef.current.width = window.innerWidth * dpr;
                    canvasRef.current.height = window.innerHeight * dpr;
                    canvasRef.current.style.width = `${window.innerWidth}px`;
                    canvasRef.current.style.height = `${window.innerHeight}px`;

                    // Re-render current frame after resize
                    if (lastFrameRef.current >= 0) {
                        renderFrame(lastFrameRef.current);
                    }
                }
            }, 100);
        };

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => {
            window.removeEventListener("resize", handleResize);
            clearTimeout(resizeTimeout);
        };
    }, [renderFrame]);

    return (
        <div id="hero" ref={targetRef} className="relative h-[400vh] bg-white">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full block object-cover"
                    style={{ willChange: 'contents' }} // GPU hint for canvas
                />

                {/* Text Overlays */}
                <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-center items-center">

                    {/* 0% - Start Text */}
                    <AnimatePresence>
                        {showIntro && (
                            <motion.div
                                style={{ opacity: opacity1 }}
                                exit={{ opacity: 0 }}
                                className="absolute text-center px-4"
                            >
                                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-black uppercase leading-none">
                                    Mohamad Fikri<br />Bin Bukhari
                                </h1>
                                <p className="text-xl md:text-3xl text-neutral-200 tracking-[0.2em] mt-8 uppercase font-light bg-black inline-block px-4 py-2">Full Stack Developer</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* 30% - Left */}
                    <motion.div style={{ opacity: opacity2 }} className="absolute left-6 md:left-24 top-1/2 -translate-y-1/2 text-left max-w-xl px-4">
                        <h2 className="text-4xl md:text-6xl font-bold text-black leading-tight">
                            Building Scalable.<br />
                            <span className="text-neutral-200 bg-black px-4 leading-tight decoration-clone box-decoration-clone">Digital Solutions.</span>
                        </h2>
                    </motion.div>

                    {/* 60% - Right */}
                    <motion.div style={{ opacity: opacity3 }} className="absolute right-6 md:right-24 top-1/2 -translate-y-1/2 text-right max-w-xl px-4">
                        <h2 className="text-4xl md:text-6xl font-bold text-black leading-tight">
                            From Concept<br />
                            To <span className="text-neutral-200 bg-black px-4 leading-tight decoration-clone box-decoration-clone">Deployment.</span>
                        </h2>
                    </motion.div>

                    {/* 90% - End Text */}
                    <motion.div
                        style={{ opacity: opacity4, scale: scaleCTA }}
                        className="absolute text-center px-4 pointer-events-auto flex flex-col items-center"
                    >
                        <h2 className="text-5xl md:text-8xl font-bold text-black mb-8 tracking-tighter uppercase">
                            Mohamad Fikri
                        </h2>
                        <h3 className="text-2xl md:text-4xl text-neutral-200 tracking-[0.2em] uppercase font-light mb-8 bg-black inline-block px-6 py-2">
                            Full Stack Developer
                        </h3>
                    </motion.div>

                </div>

                {/* Loading Indicator */}
                {visualProgress < 100 && (
                    <div className="absolute inset-0 flex items-center justify-center text-black z-50 bg-white">
                        <div className="text-center">
                            <div className="text-6xl font-bold mb-4 font-mono">{visualProgress}%</div>
                            <div className="text-sm tracking-[0.5em] uppercase animate-pulse">System Loading</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
