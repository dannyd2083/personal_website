"use client"
import React, {useState} from 'react';
import {motion} from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import {projectList} from "@/components/ProjectData";
import ProjectModal from "@/components/ProjectModal";
const Projects = () => {
    const [selected, setSelected] = useState(null);
    return (
        <div>
            <a id ="projects" className="anchor"></a>
            <div className='max-w-[1240px] mx-auto min-h-screen px-2 py-16'>
                <h1 className="text-regal-yellow text-5xl m-10 font-AbrilFatface">
                    Projects
                </h1>
                    <div className='grid md:grid-cols-4 gap-8 justify-center align-middle'>

                        {projectList.map((item) => (
                            <ProjectCard key={item.id} setSelected={setSelected} project={item} />
                        ))}
                    </div>
                {/*<ProjectModal selected={selected} setSelected={setSelected}/>*/}
            </div>
        </div>
    );
};

export default Projects;