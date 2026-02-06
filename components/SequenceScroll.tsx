"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useMotionValueEvent, useTransform, motion, AnimatePresence } from "framer-motion";

import { AnimatedBackground } from "./ui/AnimatedBackground";

// Configuration
const TOTAL_SEQ_IMAGES = 240;
const DESKTOP_STEP = 2; // Loads 120 frames
const MOBILE_STEP = 4; // Loads 60 frames

// Check WebP support
const checkWebPSupport = (): Promise<boolean> => {
    return new Promise((resolve) => {
        if (typeof window === 'undefined') return resolve(false);
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
    const [isCanvasReady, setIsCanvasReady] = useState(false);
    const [isMounted, setIsMounted] = useState(false); // Fix hydration mismatch
    const targetRef = useRef<HTMLDivElement>(null);
    const lastFrameRef = useRef<number>(-1);
    const rafIdRef = useRef<number>(0);

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

    // Mobile specific opacity: Stay visible until 15%, then fade out by 25%
    const opacityMobile = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);

    // Detect mobile and WebP support
    useEffect(() => {
        setIsMounted(true);
        const checkDevice = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkDevice();
        window.addEventListener("resize", checkDevice);

        checkWebPSupport().then(setSupportsWebP);

        return () => window.removeEventListener("resize", checkDevice);
    }, []);

    // Preload Images with optimized loading (DESKTOP ONLY)
    useEffect(() => {
        // Skip image loading on mobile
        if (isMobile) {
            setLoadedCount(TOTAL_SEQ_IMAGES); // Simulate loaded
            return;
        }

        const loadedImages: HTMLImageElement[] = [];
        let count = 0;
        const step = DESKTOP_STEP;

        const updateCount = () => {
            count++;
            setLoadedCount(count);
        };

        // Use WebP images from optimized folder
        const extension = "webp";
        const basePath = "/sequence-webp";

        // Priority load first 30 frames
        const priorityFrames = 30;

        for (let i = 1; i <= TOTAL_SEQ_IMAGES; i += step) {
            const img = new Image();
            const frameNumber = i.toString().padStart(3, "0");

            // Add loading priority for first frames
            if (i <= priorityFrames * step) {
                (img as any).fetchPriority = "high";
            }

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

    // Eagerly render first frame on mount to prevent white flash
    useEffect(() => {
        if (isMobile) return;

        const img = new Image();
        img.src = `/sequence-webp/ezgif-frame-001.webp`;

        img.onload = () => {
            if (canvasRef.current) {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext("2d");
                if (ctx) {
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;

                    const w = canvas.width;
                    const h = canvas.height;
                    const imgW = img.width;
                    const imgH = img.height;
                    const scale = Math.max(w / imgW, h / imgH);
                    const x = (w - imgW * scale) / 2;
                    const y = (h - imgH * scale) / 2;

                    ctx.drawImage(img, x, y, imgW * scale, imgH * scale);
                    setIsCanvasReady(true);
                }
            }
        };
    }, [isMobile]);

    // Animate Visual Progress
    useEffect(() => {
        if (isMobile) return;

        const step = DESKTOP_STEP;
        const totalFrames = Math.ceil(TOTAL_SEQ_IMAGES / step);
        const target = Math.round((loadedCount / totalFrames) * 100);

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

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const w = canvas.width;
        const h = canvas.height;
        const imgW = img.width;
        const imgH = img.height;

        const scale = Math.max(w / imgW, h / imgH);
        const x = (w - imgW * scale) / 2;
        const y = (h - imgH * scale) / 2;

        ctx.drawImage(img, x, y, imgW * scale, imgH * scale);
    }, [images, isMobile]);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (isMobile) {
            // On mobile, hide intro only after it has faded out (approx > 0.25)
            if (latest > 0.26 && showIntro) {
                setShowIntro(false);
            } else if (latest < 0.25 && !showIntro) {
                setShowIntro(true);
            }
            return;
        }

        if (latest > 0.01 && showIntro) {
            setShowIntro(false);
        }

        if (images.length === 0) return;

        const frameIndex = Math.min(
            images.length - 1,
            Math.floor(latest * images.length)
        );

        if (frameIndex === lastFrameRef.current) return;
        lastFrameRef.current = frameIndex;

        if (rafIdRef.current) {
            cancelAnimationFrame(rafIdRef.current);
        }

        rafIdRef.current = requestAnimationFrame(() => renderFrame(frameIndex));
    });

    // Handle Resize
    useEffect(() => {
        if (isMobile) return;

        let resizeTimeout: NodeJS.Timeout;

        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (canvasRef.current) {
                    const dpr = Math.min(window.devicePixelRatio || 1, 2);
                    canvasRef.current.width = window.innerWidth * dpr;
                    canvasRef.current.height = window.innerHeight * dpr;
                    canvasRef.current.style.width = `${window.innerWidth}px`;
                    canvasRef.current.style.height = `${window.innerHeight}px`;

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
    }, [renderFrame, isMobile]);

    if (!isMounted) return <div ref={targetRef} className="h-[400vh] bg-white" />; // Moved to end to fix Hook order

    return (
        <div id="hero" ref={targetRef} className="relative h-[400vh] bg-white">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {isMobile ? (
                    <AnimatedBackground />
                ) : (
                    <>
                        {/* Placeholder Image for Instant Load (Desktop) - Z-20 on top, fades out */}
                        <img
                            src="/sequence-webp/ezgif-frame-001.webp"
                            alt="Background"
                            className={`absolute inset-0 w-full h-full object-cover z-20 transition-opacity duration-700 ${isCanvasReady ? "opacity-0" : "opacity-100"}`}
                            style={{ objectFit: "cover" }}
                        />
                        {/* Canvas - Z-10 below, always visible (revealed when image fades) */}
                        <canvas
                            ref={canvasRef}
                            className="relative z-10 w-full h-full block object-cover"
                            style={{ willChange: 'contents' }}
                        />
                    </>
                )}

                {/* Text Overlays */}
                <div className="absolute inset-0 pointer-events-none z-30 flex flex-col justify-center items-center">

                    {/* 0% - Start Text (Visible on both Mobile and Desktop) */}
                    <AnimatePresence>
                        {showIntro && (
                            <motion.div
                                style={{ opacity: isMobile ? opacityMobile : opacity1 }}
                                exit={{ opacity: 0 }}
                                className="absolute text-center px-4"
                            >
                                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase leading-none text-neutral-900">
                                    Mohamad Fikri<br />Bin Bukhari
                                </h1>
                                <div className="mt-8 inline-block">
                                    <p className="text-sm md:text-base text-white tracking-[0.3em] uppercase font-medium bg-neutral-900/90 backdrop-blur-md px-8 py-3 rounded-full border border-neutral-800 shadow-2xl">
                                        Full Stack Developer
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Scroll Down Indicator */}
                    <motion.div
                        style={{ opacity: opacity1 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-30"
                    >
                        <span className={`text-[10px] uppercase tracking-[0.2em] font-medium ${isMobile ? "text-neutral-500" : "text-neutral-500"}`}>
                            {isMobile ? "SCROLL" : "Scroll"}
                        </span>

                        {isMobile ? (
                            // Mobile Finger/Touch Icon
                            <motion.div
                                animate={{ y: [0, 6, 0], opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="28"
                                    height="28"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-neutral-500"
                                >
                                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                                    <path d="M9 3v10" />
                                    <path d="M12 3v12" />
                                    <path d="M15 3v10" />
                                    <path d="M17 14h2" />
                                    <path d="M5 14H3" />
                                    <path d="M11 20v2" />
                                </svg>
                            </motion.div>
                        ) : (
                            // Desktop Mouse Icon
                            <motion.div
                                animate={{ y: [0, 6, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                className="w-5 h-8 border-[1.5px] border-neutral-400 rounded-full flex justify-center p-1"
                            >
                                <motion.div
                                    animate={{ y: [0, 4, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                    className="w-0.5 h-1.5 bg-neutral-400 rounded-full"
                                />
                            </motion.div>
                        )}
                    </motion.div>

                    {/* 30% - Left */}
                    <motion.div style={{ opacity: opacity2 }} className="absolute left-6 md:left-24 top-1/2 -translate-y-1/2 text-left max-w-xl px-4">
                        <h2 className={`text-4xl md:text-6xl font-bold leading-tight ${isMobile ? "text-neutral-900" : "text-black mix-blend-difference text-white"}`}>
                            Building Scalable.<br />
                            <span className="text-white bg-neutral-900/90 px-4 py-1 rounded-xl shadow-lg leading-tight decoration-clone box-decoration-clone">Digital Solutions.</span>
                        </h2>
                    </motion.div>

                    {/* 60% - Right */}
                    <motion.div style={{ opacity: opacity3 }} className="absolute right-6 md:right-24 top-1/2 -translate-y-1/2 text-right max-w-xl px-4">
                        <h2 className={`text-4xl md:text-6xl font-bold leading-tight ${isMobile ? "text-neutral-900" : "text-black mix-blend-difference text-white"}`}>
                            From Concept<br />
                            To <span className="text-white bg-neutral-900/90 px-4 py-1 rounded-xl shadow-lg leading-tight decoration-clone box-decoration-clone">Deployment.</span>
                        </h2>
                    </motion.div>

                    {/* 90% - End Text */}
                    <motion.div
                        style={{ opacity: opacity4, scale: scaleCTA }}
                        className="absolute text-center px-4 pointer-events-auto flex flex-col items-center"
                    >
                        <h2 className={`text-5xl md:text-8xl font-bold mb-8 tracking-tighter uppercase ${isMobile ? "text-neutral-900" : "text-black mix-blend-difference text-white"}`}>
                            Mohamad Fikri
                        </h2>
                        <div className="mb-8">
                            <h3 className="text-base md:text-lg text-white tracking-[0.3em] uppercase font-medium bg-neutral-900/90 backdrop-blur-md px-10 py-4 rounded-full border border-neutral-800 shadow-2xl inline-block">
                                Full Stack Developer
                            </h3>
                        </div>
                    </motion.div>

                </div>

                {/* Loading Indicator (DESKTOP ONLY) */}
                {!isMobile && visualProgress < 100 && (
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
