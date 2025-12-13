
"use client"
import React, {useState} from 'react';
import {motion} from 'framer-motion';
import ProjectCard from "@/components/ProjectCard";
import {projectList, categories} from "@/components/ProjectData";

const Projects = () => {
    const [selected, setSelected] = useState(null);
    const [activeCategory, setActiveCategory] = useState("all");

    // Filter projects based on active category
    const filteredProjects = activeCategory === "all"
        ? projectList
        : projectList.filter(project => project.category === activeCategory);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        }
    };

    return (
        <div className="bg-clay-court-dark min-h-screen py-16">
            <a id="projects" className="anchor"></a>
            <div className='max-w-[1240px] mx-auto min-h-screen px-2 py-16'>
                <h1 className="text-clay-dust text-5xl m-10 font-AbrilFatface">
                    Projects
                </h1>

                {/* Category Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-12 px-4">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`px-6 py-3 rounded-lg font-Lato font-semibold transition-all duration-300 ease-in-out
                                ${activeCategory === category.id
                                    ? 'bg-clay-forest text-clay-cream shadow-lg scale-105'
                                    : 'bg-clay-cream text-clay-charcoal hover:bg-clay-dust hover:scale-105'
                                }
                            `}
                        >
                            {category.label}
                            <span className={`ml-2 text-sm ${activeCategory === category.id ? 'text-clay-cream/80' : 'text-clay-charcoal/60'}`}>
                                ({category.count})
                            </span>
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <motion.div
                    className='grid md:grid-cols-4 gap-8 justify-center align-middle'
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    key={activeCategory}
                >
                    {filteredProjects.map((item, index) => (
                        <ProjectCard key={item.id} setSelected={setSelected} project={item} />
                    ))}
                </motion.div>

                {/* Empty state */}
                {filteredProjects.length === 0 && (
                    <div className="text-center text-clay-dust text-xl font-Lato py-20">
                        No projects found in this category.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Projects;