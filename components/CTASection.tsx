"use client";

export default function CTASection() {
    return (
        <section id="cta" className="h-screen w-full flex items-center justify-center bg-neutral-100 relative overflow-hidden z-10">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 via-white to-neutral-200 animate-gradient-xy opacity-50" />

            <div className="relative z-20 text-center px-4">
                <h2 className="text-5xl md:text-9xl font-bold text-black mb-8 tracking-tighter uppercase mix-blend-overlay">
                    Let's Connect
                </h2>
                <button className="bg-black text-white px-12 py-6 rounded-full text-xl font-bold tracking-widest hover:scale-105 hover:bg-neutral-800 transition-all duration-300">
                    CONTACT ME
                </button>
            </div>
        </section>
    );
}
