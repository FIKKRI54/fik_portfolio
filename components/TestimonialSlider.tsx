import LogoLoop from "./ui/LogoLoop";
import { FaPython, FaReact, FaLaravel, FaJava, FaPhp, FaHtml5, FaCss3Alt, FaGitAlt, FaDatabase } from "react-icons/fa";
import { SiTypescript, SiCplusplus, SiDart, SiFlutter, SiMysql, SiFirebase, SiGit, SiTailwindcss, SiPostgresql, SiDotnet, SiGithub, SiGitlab, SiAdobephotoshop, SiGradle, SiAndroidstudio } from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";
import { VscVscode } from "react-icons/vsc";

const categories = [
    {
        title: "Languages",
        skills: [
            { name: "Python", icon: <FaPython /> },
            { name: "TypeScript", icon: <SiTypescript /> },
            { name: "C#", icon: <TbBrandCSharp /> },
            { name: "PHP", icon: <FaPhp /> },
            { name: "Java", icon: <FaJava /> },
            { name: "C++", icon: <SiCplusplus /> },
            { name: "SQL", icon: <FaDatabase /> },
            { name: "Dart", icon: <SiDart /> },
        ]
    },
    {
        title: "Frameworks & Libraries",
        skills: [
            { name: "Laravel", icon: <FaLaravel /> },
            { name: ".NET", icon: <SiDotnet /> },
            { name: "ASP.NET", icon: <SiDotnet /> },
            { name: "React", icon: <FaReact /> },
            { name: "Flutter", icon: <SiFlutter /> },
            { name: "Tailwind", icon: <SiTailwindcss /> },
        ]
    },
    {
        title: "Web & Database",
        skills: [
            { name: "HTML5", icon: <FaHtml5 /> },
            { name: "CSS3", icon: <FaCss3Alt /> },
            { name: "MySQL", icon: <SiMysql /> },
            { name: "Firebase", icon: <SiFirebase /> },
        ]
    },
    {
        title: "Tools & Platforms",
        skills: [
            { name: "VS Code", icon: <VscVscode /> },
            { name: "Android Studio", icon: <SiAndroidstudio /> },
            { name: "Gradle", icon: <SiGradle /> },
            { name: "Photoshop", icon: <SiAdobephotoshop /> },
            { name: "Git", icon: <SiGit /> },
            { name: "GitHub", icon: <SiGithub /> },
            { name: "GitLab", icon: <SiGitlab /> },
        ]
    }
];

export default function TestimonialSlider() {
    // Flatten skills for the loop
    const allSkills = categories.flatMap(cat => cat.skills);

    return (
        <section id="skills" className="min-h-[50vh] flex flex-col justify-center bg-white relative z-10 py-24 border-b border-neutral-100">
            <h3 className="text-neutral-400 text-sm font-mono mb-16 uppercase tracking-widest text-center">Technical Arsenal</h3>

            {/* Top Loop */}
            <div className="py-8 mb-12 opacity-30 pointer-events-none">
                <LogoLoop items={allSkills} direction="left" speed={30} />
            </div>

            <div className="max-w-7xl mx-auto px-4 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {categories.map((category, idx) => (
                        <div key={idx} className="flex flex-col gap-6">
                            <h4 className="text-xl font-bold text-neutral-800 border-b border-neutral-200 pb-2">{category.title}</h4>
                            <div className="grid grid-cols-2 gap-4">
                                {category.skills.map((skill, i) => (
                                    <div key={i} className="flex items-center gap-4 group">
                                        <span className="text-4xl text-neutral-400 group-hover:text-black transition-colors duration-300">
                                            {skill.icon}
                                        </span>
                                        <span className="text-lg font-medium text-neutral-500 group-hover:text-neutral-900 transition-colors duration-300">
                                            {skill.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Loop */}
            <div className="py-8 mt-12 opacity-30 pointer-events-none">
                <LogoLoop items={[...allSkills].reverse()} direction="right" speed={30} />
            </div>
        </section>
    );
}
