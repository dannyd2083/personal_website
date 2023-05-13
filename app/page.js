import React from 'react';
import Navbar from "@/components/Navbar";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Experience from "@/sections/Experience";
import Projects from "@/sections/Projects";

const Home = () => {
    return (
        <div>
            <Navbar/>
            <Hero/>
            <About/>
            <Experience/>
            <Projects/>
        </div>
    );
};

export default Home;