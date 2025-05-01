import React from 'react';
import Navbar from "@/components/Navbar";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Experience from "@/sections/Experience";
import Projects from "@/sections/Projects";
import Footer from "@/sections/Footer"

const Home = () => {
    return (
        <>
            <Hero/>
            <About/>
            <Experience/>
            <Projects/>
        </>
    );
};

export default Home;