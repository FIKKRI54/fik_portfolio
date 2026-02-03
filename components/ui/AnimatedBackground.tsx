"use client";
import { motion } from "framer-motion";
import React from "react";

export const AnimatedBackground = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return (
        <div className={`relative w-full h-full overflow-hidden bg-neutral-950 flex flex-col items-center justify-center ${className}`}>
            <div className="absolute inset-0 w-full h-full bg-neutral-950 z-0" />

            {/* Aurora Effect */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
                className="absolute inset-0 z-0 opacity-50"
            >
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/30 blur-[100px] animate-pulse" />
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/30 blur-[100px] animate-pulse delay-75" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/30 blur-[100px] animate-pulse delay-150" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-teal-500/30 blur-[100px] animate-pulse delay-300" />

                {/* Moving Blobs */}
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                    className="absolute top-[20%] left-[30%] w-[30vw] h-[30vw] min-w-[300px] min-h-[300px] bg-indigo-600/20 rounded-full blur-[80px]"
                />
                <motion.div
                    animate={{
                        x: [0, -100, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.5, 1]
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                    className="absolute bottom-[20%] right-[30%] w-[30vw] h-[30vw] min-w-[300px] min-h-[300px] bg-purple-600/20 rounded-full blur-[80px]"
                />
            </motion.div>

            {/* Noise Overlay */}
            <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {children}
        </div>
    );
};
