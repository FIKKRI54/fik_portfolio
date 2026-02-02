"use client";

import { motion } from "framer-motion";
import { FaWhatsapp, FaEnvelope, FaPhone } from "react-icons/fa";

export default function ContactSection() {
    // Update these with your actual contact details
    const phoneNumber = "+60-19595-4882"; // Your phone number in international format
    const email = "fikribukhari54@gmail.com"; // Your email
    const whatsappNumber = "+60-19595-4882"; // Your WhatsApp number (usually same as phone)

    return (
        <section id="contact" className="py-32 bg-neutral-950 text-white px-4 md:px-20 relative overflow-hidden">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '48px 48px'
                }} />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-neutral-400 text-sm font-mono mb-6 uppercase tracking-[0.3em]"
                    >
                        Get In Touch
                    </motion.h3>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
                    >
                        Let's Connect
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-neutral-400 max-w-2xl mx-auto"
                    >
                        Actively seeking internship opportunities to apply my skills and grow professionally.
                        Also open to freelance projects. Feel free to reach out through any channel below.
                    </motion.p>
                </div>

                {/* Contact Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* WhatsApp */}
                    <motion.a
                        href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="group relative bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-lg p-6 transition-all duration-300 hover:bg-neutral-800/50 flex flex-col items-start"
                    >
                        {/* Icon Circle */}
                        <div className="w-12 h-12 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center mb-4 group-hover:bg-neutral-700 group-hover:scale-110 transition-all duration-300">
                            <FaWhatsapp className="text-xl text-neutral-300" />
                        </div>

                        <h3 className="text-lg font-semibold mb-1 text-white">WhatsApp</h3>
                        <p className="text-xs text-neutral-500 mb-3">Send me a message</p>
                        <p className="font-mono text-neutral-300 text-xs mb-3">{phoneNumber}</p>

                        <div className="flex items-center text-xs text-neutral-400 group-hover:text-neutral-300 transition-colors">
                            <span className="mr-2">Start chat</span>
                            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                        </div>

                        {/* Subtle hover glow */}
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-neutral-700/0 to-neutral-700/0 group-hover:from-neutral-700/5 group-hover:to-neutral-700/10 transition-all duration-300" />
                    </motion.a>

                    {/* Email */}
                    <motion.a
                        href={`https://mail.google.com/mail/?view=cm&to=${email}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="group relative bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-lg p-6 transition-all duration-300 hover:bg-neutral-800/50 flex flex-col items-start"
                    >
                        {/* Icon Circle */}
                        <div className="w-12 h-12 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center mb-4 group-hover:bg-neutral-700 group-hover:scale-110 transition-all duration-300">
                            <FaEnvelope className="text-xl text-neutral-300" />
                        </div>

                        <h3 className="text-lg font-semibold mb-1 text-white">Email</h3>
                        <p className="text-xs text-neutral-500 mb-3">Professional inquiries</p>
                        <p className="font-mono text-neutral-300 text-xs mb-3 break-all">{email}</p>

                        <div className="flex items-center text-xs text-neutral-400 group-hover:text-neutral-300 transition-colors">
                            <span className="mr-2">Send email</span>
                            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                        </div>

                        {/* Subtle hover glow */}
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-neutral-700/0 to-neutral-700/0 group-hover:from-neutral-700/5 group-hover:to-neutral-700/10 transition-all duration-300" />
                    </motion.a>

                    {/* Phone */}
                    <motion.a
                        href={`tel:${phoneNumber}`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="group relative bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-lg p-6 transition-all duration-300 hover:bg-neutral-800/50 flex flex-col items-start"
                    >
                        {/* Icon Circle */}
                        <div className="w-12 h-12 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center mb-4 group-hover:bg-neutral-700 group-hover:scale-110 transition-all duration-300">
                            <FaPhone className="text-xl text-neutral-300" />
                        </div>

                        <h3 className="text-lg font-semibold mb-1 text-white">Phone</h3>
                        <p className="text-xs text-neutral-500 mb-3">Direct call</p>
                        <p className="font-mono text-neutral-300 text-xs mb-3">{phoneNumber}</p>

                        <div className="flex items-center text-xs text-neutral-400 group-hover:text-neutral-300 transition-colors">
                            <span className="mr-2">Call now</span>
                            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                        </div>

                        {/* Subtle hover glow */}
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-neutral-700/0 to-neutral-700/0 group-hover:from-neutral-700/5 group-hover:to-neutral-700/10 transition-all duration-300" />
                    </motion.a>
                </div>
            </div>
        </section>
    );
}
