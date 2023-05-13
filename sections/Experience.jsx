import React from 'react';
import ExperienceCard from "@/components/ExperienceCard";

const Experience = () => {

    const UBC = {
        title: "Teaching Assistant @ UBC",
        date: "May 2022 - August 2022 / May 2023 - present",
        bulletPoints: [
            "Teaching Assistant for CPSC 455 – Applied Industry Practices (course focused on MERN development)",
            "Held office hours and marked student assignments"
        ]
    }


    const Semios = {
        title: "JavaScript Developer Co-op @ Semios",
        date: "Jan 2022 – August 2022",
        bulletPoints: [
            "Implemented new components with React for different features (including interacted with Ant Design and Google Map components)",
            "Wrote logic functions such as sorting contents, form validation and time manipulation (moment.js)",
            "Change some styles with CSS based on the design requirement"
        ]
    }
    const Bluvec = {
        title: "Web Develope @ Bluvec Technologies  Inc.",
        date: "September 2021 – December 2021",
        bulletPoints: [
            "Built the company’ landing page by using company given React template",
            "Wrote tests with Golang for company’s projects",
            "implemented functions that delete past due images files"
        ]
    }


    return (
        <div className=" max-w-[1440px] mx-auto  grid grid-cols-1 min-h-screen">
            <a id ="experience" className="anchor"></a>
            <h1 className="text-regal-yellow text-5xl m-10 font-AbrilFatface"> My Experience </h1>
            <ExperienceCard {...UBC}/>
            <ExperienceCard{...Semios}/>
            <ExperienceCard{...Bluvec}/>
        </div>
    );
};

export default Experience;