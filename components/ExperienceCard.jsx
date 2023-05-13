'use client'
import React from 'react';
import { motion, useScroll } from "framer-motion"
const ExperienceCard = ({title,date,bulletPoints}) => {
    return (
        <motion.div  initial={{ opacity: 0 }}
                     whileInView={{ opacity: 1 }}
                     transition={{duration: 0.5}}
                     whileHover={{ scale: 1.011 }}
                     viewport={{ once: true }}
                     className="bg-regal-yellow text-black m-8 rounded-lg
                      shadow-[rgba(255,_243,_138,_0.5)_0px_9px_30px]
                      ">
            <motion.div
                initial={{ x: -300}}
                whileInView={{ x: 0}}
                viewport={{ once: true }}
                transition={{duration: 1}}
                className= "grid columns-1 m-8">
                <h1 className="font-AbrilFatface text-3xl">{title}</h1>
                <h2 className="text-xl font-bold">{date}</h2>
                <ul className = "list-disc list-inside text-xl">
                    {bulletPoints?.map((item,i) => <li key={i}>{item}</li>)}
                </ul>
            </motion.div>
        </motion.div>
    );
};
//shadow-[2px_2px_rgba(_254,_231,_21,_0.4),_4px_4px_rgba(_254,_237,_80,_0.3),_8px_8px_rgba(_255,_243,_138,_0.2),_16px_16px_rgba(_255,_249,_197,_0.1),_25px_25px_rgba(_255,_255,_255,_0.05)]

export default ExperienceCard;

