import React from 'react';
import ExperienceCard from "@/components/ExperienceCard";

const Experience = () => {

    const UBC = {
        title: "Teaching Assistant @ UBC",
        date: "May 2022 - August 2022 & May 2023 - August 2023 & October 2023 - December 2023",
        bulletPoints: [
            "Teaching Assistant for CPSC 455 – Applied Industry Practices (course focused on MERN development)",
            "Teaching Assistant for CPSC 313 – Computer Hardware and Operating Systems",
            "Conducted office hours, providing personalized assistance to students, and meticulously graded assignments; also performed exam invigilation duties, ensuring academic integrity."
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
        title: "Web Developer @ Bluvec Technologies  Inc.",
        date: "September 2021 – December 2021",
        bulletPoints: [
            "Built the company’ landing page by using company given React template",
            "Wrote tests with Golang for company’s projects",
            "implemented functions that delete past due images files"
        ]
    }

    const SFU = {
        title: "Master of Professional Computer Science, Cybersecurity",
        subtitle: "Simon Fraser University",
        date: "2024 – 2026",
        bulletPoints: [
            "Cybersecurity concentration: penetration testing, applied cryptography, malware analysis, and secure software design"
        ]
    }

    const UBCEdu = {
        title: "Bachelor of Science in Computer Science",
        subtitle: "University of British Columbia",
        date: "2018 – 2024",
        bulletPoints: [
            "Graduated with Distinction"
        ]
    }


    return (
        <div className="bg-clay-court-dark border-b-4 border-clay-cream min-h-screen py-16">
        <a id ="experience" className="anchor"></a>
            <div className='max-w-[1240px] mx-auto min-h-screen px-2 py-16'>
                <h1 className="text-clay-cream text-5xl m-10 font-AbrilFatface"> My Experience </h1>
                <div className='grid grid-cols-1 gap-8 justify-center  align-middle'>
                <ExperienceCard {...UBC}/>
                    <ExperienceCard{...Semios}/>
                    <ExperienceCard{...Bluvec}/>
                </div>

                <h1 className="text-clay-cream text-5xl m-10 mt-20 font-AbrilFatface"> Education </h1>
                <div className='grid grid-cols-1 gap-8 justify-center  align-middle'>
                    <ExperienceCard {...SFU}/>
                    <ExperienceCard {...UBCEdu}/>
                </div>
            </div>
        </div>
    );
};

export default Experience;