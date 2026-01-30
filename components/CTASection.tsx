"use client";

export default function CTASection() {
    return (
        <section className="h-screen w-full flex items-center justify-center bg-copper relative overflow-hidden z-10">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-copper via-orange-600 to-red-600 animate-gradient-xy opacity-90" />

            <div className="relative z-20 text-center px-4">
                <h2 className="text-5xl md:text-9xl font-bold text-white mb-8 tracking-tighter uppercase mix-blend-overlay">
                    System Ready
                </h2>
                <button className="bg-black text-white px-12 py-6 rounded-full text-xl font-bold tracking-widest hover:scale-105 hover:bg-white hover:text-black transition-all duration-300">
                    START SEQUENCE
                </button>
            </div>
        </section>
    );
}
