"use client"
import React, {useState} from 'react';
import {AnimatePresence, motion} from "framer-motion";
import {AiFillGithub} from 'react-icons/ai'
import {RxCross2} from  'react-icons/rx'
const ProjectCard = ({setSelected, project}) => {
    const [isSwitch, setSwitch] = useState(false);
    let right = (project.id-2)%4===0 || (project.id-3)%4===0

    const container = {
        hidden: {x: right ? 280 : -280},
        visible: {
            x: 0,
            rotate: right ? -360 : 360 ,
            transition: {
                duration: 0.7,
                delayChildren: 0.4,
            }
        }
    };

    const item = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1
        }
    };

    const wrapperVariants = {
        initial: {
            clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
            transition: { duration: .4 }
        },
        animate: {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            transition: { duration: .4, staggerChildren: .1 }
        },
        exit: {
            clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
            transition: { duration: .4 }
        }
    }
    return (

                <motion.div className="bg-regal-yellow items-center justify-center rounded min-h-[500px]"
                        variants = {container}
                        initial={"hidden"}
                        whileInView={"visible"}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                        layoutId={`card-${project.id}`}
                        onClick={() => {
                            setSelected(project);
                            setSwitch(!isSwitch);
                        }}
            >
                <motion.div className="text-black"
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
                                <div className="m-10 flex bottom-0 justify-center items-center bg-black rounded-lg text-white font-Lato font-bold">
                                    Click the Card
                                </div>
                                <img src={project.img.src} alt="profile" className="rounded-lg p-5"/>
                                <h1 className="p-4 text-3xl font-AbrilFatface">{project.title}</h1>
                                {project.url !=null ? (
                                    <a href = {project.url} >
                                    <AiFillGithub className="ml-5 hover:scale-125 ease-in duration-300" color={'#000000'} size={30}/>
                                    </a>
                                ) : (
                                    <div className= "flex ">
                                    <RxCross2 className="ml-5" color={'#000000'} size={30}></RxCross2>
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
                                <h1 className="p-4 text-3xl font-AbrilFatface">{project.title}</h1>
                                <ul className = "px-4 list-disc list-inside font-Lato">
                                    {project.features?.map((item,i) => <li key={i}>{item}</li>)}
                                </ul>
                                <div className= "font-AbrilFatface m-2 text-3xl">Skill</div>
                                <div className="mx-auto flex flex-wrap">
                                    {project.skills?.map((item,i) =>
                                        <div className = "m-1 px-4 bg-black rounded-lg text-white font-Lato font-bold"
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