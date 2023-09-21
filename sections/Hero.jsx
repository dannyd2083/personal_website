'use client'
import React from "react";
import {useEffect,useRef} from "react";
import Typed from "typed.js";
import Link from "next/link";
import {AiFillGithub,AiFillLinkedin, AiFillFilePdf} from 'react-icons/ai'
const Hero = () => {
    const el = useRef(null)
    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: ['Coder','Gamer','Dreamer'],
            typeSpeed: 40,
            backSpeed: 0,
            smartBackspace: true,
            loop:true
        });

        return ()  => {
            // Destroy Typed instance during cleanup to stop animation
            typed.destroy();
        };
    }, []);
    return (
        <div id = "home" className="flex items-center justify-center h-screen mb-12 bg-fixed bg-center bg-cover">
            <div/>
            <div   className= ' flex flex-wrap flex-col justify-between  z-[2] '>
                <div  className="lg:flex pb-5">
                    <div className="text-4xl font-bold mr-3 mt-6 pl-4 items-center">It's me, hi, I am</div>
                    <div className="text-7xl font-bold text-regal-yellow lg:text-left lg:pl-0 md: pl-4 font-AbrilFatface">ZeCheng (Danny) Deng</div>
                </div>
                <div className="text-5xl mb-2  pl-4">A <span className="hero-sub-title" ref={el}></span></div>
                <div className = "mt-10 ml-4">
                    <Link href={"/#about"}><button className=" border text-lg px-2 hover:text-regal-yellow hover:border-regal-yellow hover:scale-110 ease-in duration-300"> About me </button></Link>
                    <div className="flex flex-row">
                        <a  href='https://github.com/dannyd2083'>
                            <AiFillGithub className="mt-5 mr-5 hover:scale-125 ease-in duration-300" color={'#fee715'} size={40}/>
                        </a>
                        <a href = 'https://www.linkedin.com/in/zecheng-danny-deng-316523187/'>
                        <AiFillLinkedin className="mt-5 mr-5 hover:scale-125 ease-in duration-300" color={'#fee715'} size={40}/>
                        </a>
                        <a href = "/DannyResume.pdf">
                            <AiFillFilePdf className="mt-5 mr-5 hover:scale-125 ease-in duration-300" color={'#fee715'} size={40}/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;