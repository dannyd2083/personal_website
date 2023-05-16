import React from 'react';
import {AiFillFilePdf, AiFillGithub, AiFillLinkedin} from "react-icons/ai";

const Footer = () => {
    return (
       <footer className="border-t-4 border-regal-yellow p-5 flex flex-wrap gap-[2rem] justify-between items-center">
           <div className= "flex align-middle justify-center text-center text-lg">
               <p>Made by Danny Deng</p>
           </div>
           <nav className= "flex flex-wrap justify-center align-middle items-center">
           <a  className= "flex items-center" href='https://github.com/dannyd2083'>
               <AiFillGithub className="mt-5 mr-5 hover:scale-125 ease-in duration-300 w-full h-auto" color={'#fee715'} size={60}/>
           </a>
           <a href = 'https://www.linkedin.com/in/zecheng-danny-deng-316523187/'>
               <AiFillLinkedin className="mt-5 mr-5 hover:scale-125 ease-in duration-300" color={'#fee715'} size={60}/>
           </a>
           <a href = "/2023resume.pdf">
               <AiFillFilePdf className="mt-5 mr-5 hover:scale-125 ease-in duration-300" color={'#fee715'} size={60}/>
           </a>
           </nav>
       </footer>
    );
};

export default Footer;