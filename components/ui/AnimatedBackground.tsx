"use client";
import React, { useEffect, useRef } from "react";

export const AnimatedBackground = ({ className }: { className?: string }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { alpha: false }); // Optimize for no transparency on canvas itself if possible
        if (!ctx) return;

        let w = canvas.width = window.innerWidth;
        let h = canvas.height = window.innerHeight;
        let particles: Particle[] = [];
        // Reduce particle count slightly for guaranteed mobile performance
        const particleCount = window.innerWidth < 768 ? 40 : 60;

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;

            constructor() {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.vx = (Math.random() - 0.5) * 0.3; // Slower, smoother movement
                this.vy = (Math.random() - 0.5) * 0.3;
                this.size = Math.random() * 2 + 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Wrap around screen
                if (this.x < 0) this.x = w;
                if (this.x > w) this.x = 0;
                if (this.y < 0) this.y = h;
                if (this.y > h) this.y = 0;
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = "rgba(160, 160, 160, 0.6)"; // Silver/Grey
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const init = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            if (!ctx) return;
            // Clear with background color instead of clearRect for performance/trail prevention
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, w, h);

            // Draw noise overlay or subtle gradient if needed? 
            // Keep it clean white for max performance as requested.

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            // Draw connections
            particles.forEach((a, index) => {
                for (let i = index + 1; i < particles.length; i++) {
                    const b = particles[i];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.strokeStyle = `rgba(200, 200, 200, ${1 - distance / 150})`; // Very subtle lines
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            });

            requestAnimationFrame(animate);
        };

        const handleResize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
            init();
        };

        window.addEventListener("resize", handleResize);
        init();
        const animationId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <div className={`absolute inset-0 z-0 bg-white ${className}`}>
            <canvas ref={canvasRef} className="block w-full h-full" />
            {/* Optional: Add a subtle overlay gradient to make it less flat */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white/50 pointer-events-none" />
        </div>
    );
};
