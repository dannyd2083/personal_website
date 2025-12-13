"use client"
import React, {useState} from 'react';
import {AnimatePresence, motion} from "framer-motion";
import {AiFillGithub} from 'react-icons/ai'
import {RxCross2} from  'react-icons/rx'

const ProjectCard = ({setSelected, project}) => {
    const [isSwitch, setSwitch] = useState(false);

    const container = {
        hidden: {
            opacity: 0,
            y: 50
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut",
                delayChildren: 0.2,
            }
        }
    };

    const item = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                duration: 0.3
            }
        }
    };

    const wrapperVariants = {
        initial: {
            clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
            transition: { duration: 0.5, ease: "easeInOut" }
        },
        animate: {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            transition: { duration: 0.5, ease: "easeInOut" }
        },
        exit: {
            clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
            transition: { duration: 0.5, ease: "easeInOut" }
        }
    }

    return (
        <motion.div className="bg-clay-cream items-center justify-center rounded min-h-[500px] shadow-[rgba(139,_90,_60,_0.2)_0px_9px_20px] border border-clay-dust/30"
                    variants = {container}
                    initial={"hidden"}
                    whileInView={"visible"}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    layoutId={`card-${project.id}`}
                    onClick={() => {
                        setSelected(project);
                        setSwitch(!isSwitch);
                    }}
        >
            <motion.div className="text-clay-charcoal"
                        variants={item}
            >
                <AnimatePresence mode = "wait" initial={false}>
                    {!isSwitch ?
                        (<motion.div
                            key="test"
                            variants={wrapperVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="min-h-[750px]"
                        >
                            <div className="m-10 flex bottom-0 justify-center items-center bg-clay-court rounded-lg text-clay-cream font-Lato font-bold">
                                Click the Card
                            </div>

                            {/* Icon-based design OR Image-based design */}
                            {project.useIconDesign ? (
                                <div className={`relative h-64 flex items-center justify-center bg-gradient-to-br ${project.gradient} rounded-lg mx-5 mb-4`}>
                                    {project.icon && <project.icon className="text-white/90" size={120} />}
                                </div>
                            ) : (
                                <img src={project.img.src} alt={project.title} className="rounded-lg p-5"/>
                            )}

                            <h1 className="p-4 text-3xl font-AbrilFatface text-clay-forest">{project.title}</h1>

                            {/* Date and Context badges */}
                            <div className="px-4 flex flex-wrap gap-2 mb-2">
                                {project.date && (
                                    <span className="px-3 py-1 bg-clay-dust/20 rounded-full text-sm font-Lato text-clay-charcoal">
                                        {project.date}
                                    </span>
                                )}
                                {project.context && (
                                    <span className="px-3 py-1 bg-clay-forest/20 rounded-full text-sm font-Lato text-clay-forest font-semibold">
                                        {project.context}
                                    </span>
                                )}
                            </div>

                            {project.url !=null ? (
                                <a href = {project.url} >
                                    <AiFillGithub className="ml-5 hover:scale-125 ease-in duration-300" color={'#3e5233'} size={30}/>
                                </a>
                            ) : (
                                <div className= "flex ">
                                    <RxCross2 className="ml-5" color={'#3e5233'} size={30}></RxCross2>
                                    <p className= "ml-2">no repo because of NDA</p>
                                </div>
                            ) }
                            <p className="p-5 text-xl">
                                {project.description}
                            </p>
                        </motion.div>):
                        <motion.div
                            key="squares"
                            variants={wrapperVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="min-h-[750px]"
                            onClick={() => {
                                setSwitch(!isSwitch);
                            }}>
                            <h1 className="p-4 text-3xl font-AbrilFatface text-clay-forest">{project.title}</h1>
                            <ul className = "px-4 list-disc list-inside font-Lato">
                                {project.features?.map((item,i) => <li key={i}>{item}</li>)}
                            </ul>
                            <div className= "font-AbrilFatface m-2 text-3xl text-clay-forest">Skills</div>
                            <div className="mx-auto flex flex-wrap">
                                {project.skills?.map((item,i) =>
                                    <div className = "m-1 px-4 bg-clay-court rounded-lg text-clay-cream font-Lato font-bold"
                                         key={i}>{item}
                                    </div>)}
                            </div>
                        </motion.div>
                    }
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
};

export default ProjectCard;