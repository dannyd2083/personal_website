import testImage from "/public/profile.jpg"
import personal_website from "/public/personal_website.png"
import pubAndFrog from  "/public/PubsAndFrog.png"
import locative from "/public/Locative.png"
import frens from  "/public/Frens.png"
import search from  "/public/Search Engine Logo.jpg"
import mythos from  "/public/Mythos.jpg"
import HTN from  "/public/HTN.png"
import Egg from "/public/Eggly-Buddy.png"
export const projectList = [
    {
        id: 0,
        img: Egg,
        title: "Eggly Buddy",
        description: "Developed as part of the CPSC 427 (Video Game Programming) course at the University of British Columbia. Inspired by Tamagotchi, players are entrusted with the delightful task of caring for an Eggly Buddy, nurturing it through various stages of evolution.",
        features: [
            "Engineered an interactive feature allowing players to clean up after their pet, integrating it with the game's physics and mechanics.",
            "Created a bathroom-themed mini-game based on the shell game concept, including implementing the shuffle movement of boxes and user interaction.",
            "Implemented a visually appealing clean-up effect using shader programming to enhance player engagement.",
            "Built a parallax background using shaders, contributing to the game's immersive 2D retro aesthetic.",
            "Utilized the nlohmann/json library for efficient game data management, handling all aspects of data saving and loading in a JSON format."
        ],
        skills: [
            "C++","SDL","Entity Component System (ECS) framework"
        ],
        url: "https://github.com/dannyd2083/Eggly-Buddies"
    },
    {

        id: 1,
        img: HTN,
        title: "Swag the North",
        description: " Spearheaded the development of an immersive game simulator using Unity, capturing the essence of the event’s\n" +
            "Sponsor Bay with an innovative swag collection mechanic",
        features: [
            "12 finalist out of 200+ projects",
            "Led player design, refined swag appearance algorithm, and streamlined scene transitions.",
            "Managed GitHub repository; trained team on Git practices.",
        ],
        skills: [
            "Unity", "C#"
        ],
        url: "https://github.com/dannyd2083/HackTheNorth",
    },
    {
        id: 2,
        img: locative,
        title: "Locative Audio",
        description: "A Geo-based project for Vancouver, which allows users to unlock audio poems inspired by the city's\n" +
            "history and culture as they visit different locations",
        features: [
            "Conducted Unity AR foundation research and achieved successful image recognition implementation on mobile devices during early development, despite client's later decision to change project direction.",
            "Developed a solution to efficiently load poem information from an XML file into an interface by utilizing a custom function and database class to match and extract data based on poem ID",
            "Created user interfaces using iGUI",
            "Scripted Unity's Camera to enable users to drag and extract data based on poem ID",
        ],
        skills: [
            "Unity", "C#"
        ],
        url: null,
    },
    {
        id: 3,
        img: pubAndFrog,
        title: "Pugs Frogs in Space",
        description: "A 2 player top-down shooting game featuring frog and pug characters where players use exploding bullets to kick their opponent out of the arena and win. Made in a 2-day game jam.",
        features: [
            "Created a bullet class with changeable bullet's velocity and special bullet's effect such as frozen bullet",
            "Implemented shooting mechanics",
            "Managed smooth scene transition by creating scripts and using scene manager"
        ],
        skills: [
            "Unity", "C#"
        ],
        url:"https://github.com/RyanmLin/Pugs-Frogs-IN-SPACE",
    },
    {
        id: 4,
        img: personal_website,
        title: "Personal Website",
        description: "My personal website, where I showcase my experience, past projects, and share insights about myself.",
        features: [
            "Used Tailwind css for styles",
            "Created cool animations with Framer Motion"
        ],
        skills: [
            "React", "JavaScript", "Framer Motion", "Tailwind css"
        ],
        url: "https://github.com/dannyd2083/personal_website"
    },
    {
        id: 5,
        img: frens,
        title: "FREN",
        description: "An app allows members to create a personal profile, later using their input to recommend others with similar\n" +
            "habits. Selecting a profile photo in the grid view will display the recommend member’s photo, as well as option\n" +
            "to chat",
        features: [
            "Set up the Redux router for the project",
            "Built chat window'S UI",
            "Created login and register pages with animations",
            "Implements pop-up modal component"
        ],
        skills: [
            "React", "JavaScript","MongoDB","Express","Redux"
        ],
        url:"https://github.com/mattbekh/frens-app"
    },
    {
        id: 6,
        img: search,
        title: "Insight UBC Search Engine",
        description: "Course project from CPSC 310 Introduction to Software Engineering. A search engine that can effectively query the metadata such as past course averages and room capacity from around campus",
        features: [
            "Implemented the functions that check if a received query is in the correct EBNF from",
            "Built the functions that prepares data result with corresponding query request",
            "Implemented function that contains logic for sending queries from the UI to the web server."
        ],
        skills: [
          " TypeScript", "JavaScript"
        ],
        url: null
    },
    {
        id: 7,
        img: mythos,
        title: "Mythos",
        description: "(The progress of this project was halted as some teammates graduated or became occupied with other commitments, such as pursuing medical school.) Mythos is a 2D platform game follows a young teen and his journey to his parents' house taking a" +
            "misfortunate detour into a fragment multiverse",
        features: [
            "Designed original art assets",
            "Participated building the magic system and implemented the functionally of magic swapping UI",
            "Implemented one of the enemies' movements "
        ],
        skills: [
            "Unity", "C#"
        ],
        url: null
    },


]