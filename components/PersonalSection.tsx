import { motion } from "framer-motion";
import TiltedCard from "./ui/TiltedCard";

const particulars = [
    { label: "Age", value: "23 Years Old" },
    { label: "Sex", value: "Male" },
    { label: "Marital Status", value: "Single" },
    { label: "Nationality", value: "Malay" },
    { label: "Languages", value: "Malay and English", sub: "(Spoken/Written)" }
];

export default function PersonalSection() {
    return (
        <section className="py-20 bg-neutral-950 px-4 md:px-20 relative z-10 border-t border-neutral-800">
            <div className="max-w-7xl mx-auto">
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-white text-4xl md:text-6xl font-bold mb-16 uppercase tracking-tighter text-center md:text-left flex flex-wrap gap-x-4 justify-center md:justify-start"
                >
                    <span>Personal</span>
                    <span className="text-neutral-500 overflow-hidden inline-flex">
                        {"Particulars".split("").map((char, i) => (
                            <motion.span
                                key={i}
                                initial={{ y: "100%" }}
                                whileInView={{ y: 0 }}
                                transition={{ delay: i * 0.05, duration: 0.5, ease: "backOut" }}
                                viewport={{ once: true }}
                                className="inline-block"
                            >
                                {char}
                            </motion.span>
                        ))}
                    </span>
                </motion.h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {particulars.map((item, index) => (
                        <div key={index} className="h-full">
                            <TiltedCard
                                containerHeight="100%"
                                containerWidth="100%"
                                scaleOnHover={1.02}
                                rotateAmplitude={8}
                                className="h-full"
                            >
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="bg-neutral-900/50 p-8 rounded-3xl border border-neutral-800 hover:border-neutral-600 shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col justify-center backdrop-blur-sm"
                                >
                                    <p className="text-neutral-500 text-sm font-mono uppercase tracking-widest mb-2">
                                        {item.label}
                                    </p>
                                    <h4 className="text-2xl font-bold text-white">
                                        {item.value}
                                    </h4>
                                    {item.sub && (
                                        <p className="text-neutral-400 text-xs mt-1 font-medium">
                                            {item.sub}
                                        </p>
                                    )}
                                </motion.div>
                            </TiltedCard>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
