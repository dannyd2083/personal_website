
"use client"
import React, {useState} from 'react';
import ProjectCard from "@/components/ProjectCard";
import {projectList} from "@/components/ProjectData";

const Projects = () => {
    const [selected, setSelected] = useState(null);
    return (
        <div className="bg-clay-court-dark min-h-screen  py-16">
            <a id ="projects" className="anchor"></a>
            <div className='max-w-[1240px] mx-auto min-h-screen  px-2 py-16'>
                <h1 className="text-clay-dust text-5xl m-10 font-AbrilFatface">
                    Projects
                </h1>
                <div className='grid md:grid-cols-4 gap-8 justify-center align-middle'>
                    {projectList.map((item) => (
                        <ProjectCard key={item.id} setSelected={setSelected} project={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Projects;