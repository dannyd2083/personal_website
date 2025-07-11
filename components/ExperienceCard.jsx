'use client'
import React from 'react';
import { motion} from "framer-motion"

const ExperienceCard = ({title,date,bulletPoints}) => {
    return (
        <motion.div  initial={{ opacity: 0 }}
                     whileInView={{ opacity: 1 }}
                     transition={{duration: 0.5}}
                     whileHover={{ scale: 1.011 }}
                     viewport={{ once: true }}
                     className="bg-clay-cream text-clay-charcoal m-8 rounded-lg
                      shadow-[rgba(139,_90,_60,_0.3)_0px_9px_30px]
                      border border-clay-court/20
                      ">
            <motion.div
                initial={{ x: -300}}
                whileInView={{ x: 0}}
                viewport={{ once: true }}
                transition={{duration: 1}}
                className= "grid columns-1 m-8">
                <h1 className="font-AbrilFatface text-3xl text-clay-forest">{title}</h1>
                <h2 className="text-xl font-bold text-clay-court">{date}</h2>
                <ul className = "list-disc list-inside text-xl">
                    {bulletPoints?.map((item,i) => <li key={i}>{item}</li>)}
                </ul>
            </motion.div>
        </motion.div>
    );
};

export default ExperienceCard;