import testImage from "/public/profile.jpg"
import personal_website from "/public/personal_website.png"
import pubAndFrog from  "/public/PubsAndFrog.png"
import locative from "/public/Locative.png"
import frens from  "/public/Frens.png"
import search from  "/public/Search Engine Logo.jpg"
import mythos from  "/public/Mythos.jpg"
import HTN from  "/public/HTN.png"
import Egg from "/public/Eggly-Buddy.png"
import { SiGraphql, SiBluetooth, SiPython, SiAmazonaws, SiRedis, SiOpenai, SiPostgresql } from 'react-icons/si'
import { TbShieldLock, TbTerminal2, TbNetwork, TbBug, TbChartBar } from 'react-icons/tb'
import { HiOutlineCodeBracket } from 'react-icons/hi2'

export const projectList = [
    // 2025 Projects (Most Recent)
    {
        id: 0,
        title: "Threat Intelligence Dashboard",
        description: "AI-powered threat intelligence platform integrating CVE vulnerabilities, phishing domain monitoring, and security trends. Features RAG-based AI assistant for context-aware threat analysis and forecasting.",
        features: [
            "Built RAG-powered AI assistant using GPT-4o and Vercel AI SDK for intelligent threat analysis",
            "Implemented real-time data visualization with Recharts for CVEs, phishing trends, and security topics",
            "Designed PostgreSQL database schema with automated data collection via n8n workflows",
            "Developed Next.js API routes for CVE tracking, phishing monitoring, and Hacker News security trends"
        ],
        skills: [
            "Next.js", "TypeScript", "PostgreSQL", "GPT-4o", "Vercel AI SDK", "Recharts", "Tailwind CSS", "n8n"
        ],
        url: "https://github.com/dannyd2083/threat-intel-dashboard",
        category: "security",
        date: "Sep 2025 - Dec 2025",
        context: "Coursework (CMPT 980)",
        useIconDesign: true,
        icon: TbChartBar,
        gradient: "from-emerald-600 to-teal-600"
    },
    {
        id: 1,
        title: "Music Stats Page",
        description: "Responsive web app aggregating listening data from Last.fm, iTunes, and Spotify with Redis caching and automated refresh workflows.",
        features: [
            "Integrated APIs from Last.fm, iTunes, and Spotify to fetch top tracks/artists",
            "Built responsive React components with fallback handling for missing data",
            "Implemented Redis caching with 1-hour TTL to reduce API calls",
            "Optimized data fetching using Promise.all and normalized JSON structures"
        ],
        skills: [
            "Next.js", "React", "Tailwind CSS", "Redis", "API Integration"
        ],
        url: "https://github.com/dannyd2083/personal_website",
        category: "web",
        date: "June 2025",
        useIconDesign: true,
        icon: SiRedis,
        gradient: "from-red-500 to-rose-600"
    },
    {
        id: 2,
        title: "TCP Network Attack Simulation",
        description: "Simulated and evaluated TCP-layer attacks in a 3-node virtual network. Launched SYN floods, RST injection, and session hijacking attacks with validation via packet capture.",
        features: [
            "Simulated TCP-layer attacks in a 3-node virtual network using Vagrant",
            "Launched TCP SYN flood to exhaust server backlog and observed mitigation via SYN cookies",
            "Executed TCP RST injection to forcibly terminate active Telnet/SSH sessions",
            "Crafted spoofed packets to hijack Telnet sessions and inject shell commands"
        ],
        skills: [
            "Python", "Scapy", "Vagrant", "GDB", "Wireshark", "Network Security"
        ],
        url: "https://github.com/dannyd2083/cmpt783-cybersecurity-labs",
        category: "security",
        date: "April 2025",
        context: "Coursework (CMPT 783)",
        useIconDesign: true,
        icon: TbNetwork,
        gradient: "from-indigo-600 to-blue-600"
    },
    {
        id: 3,
        title: "ROP Exploitation",
        description: "Developed and tested ROP chains against custom x64 Linux binaries with NX protection enabled and ASLR disabled. Automated payload generation using Python scripts.",
        features: [
            "Used GDB and ROPgadget to locate gadgets and construct precise exploit payloads",
            "Handled register constraints and gadget chaining with libc offsets",
            "Wrote Python scripts to automate ROP payload generation",
            "Explored buffer overflow, format string, and return-to-libc attacks"
        ],
        skills: [
            "C", "Python", "GDB", "ROPgadget", "x86 Assembly", "Binary Exploitation"
        ],
        url: "https://github.com/dannyd2083/cmpt783-cybersecurity-labs",
        category: "security",
        date: "Mar 2025",
        context: "Coursework (CMPT 783)",
        useIconDesign: true,
        icon: TbBug,
        gradient: "from-red-600 to-orange-600"
    },

    // 2024 Projects
    {
        id: 4,
        img: personal_website,
        title: "Personal Website",
        description: "Portfolio website showcasing experience, projects, and skills with smooth animations and responsive design.",
        features: [
            "Used Tailwind CSS for responsive styling",
            "Created smooth animations with Framer Motion",
            "Built with Next.js for optimal performance"
        ],
        skills: [
            "Next.js", "React", "JavaScript", "Framer Motion", "Tailwind CSS"
        ],
        url: "https://github.com/dannyd2083/personal_website",
        category: "web",
        date: "2024 – Present"
    },
    {
        id: 5,
        title: "PrediQL",
        description: "LLM-assisted fuzzing pipeline using LLaMA 3 to automatically generate and test GraphQL queries for security vulnerabilities including SQL injection, DoS, and batching attacks.",
        features: [
            "Developed Python scripts to automate LLaMA-based query generation via Ollama",
            "Converted LLM outputs into structured JSON payloads for API testing",
            "Implemented iterative query refinement based on error responses",
            "Integrated with GraphQLer for dependency-aware testing"
        ],
        skills: [
            "Python", "GraphQL", "Ollama", "LLaMA 3", "Security Testing"
        ],
        url: "https://github.com/fishbabymail/PrediQL",
        category: "security",
        date: "Sep 2024 – Dec 2024",
        context: "Research Project",
        useIconDesign: true,
        icon: SiGraphql,
        gradient: "from-purple-600 to-pink-600"
    },
    {
        id: 6,
        title: "Bluetooth Cryptographic Protocols",
        description: "Implemented BLE pairing protocols and Bluetooth Mesh provisioning. Designed cryptographic attacks including brute-force passkey recovery, reflection attacks, and malleable commitment exploits.",
        features: [
            "Implemented Just Works and Passkey Entry pairing methods with validation using Bluetooth specification",
            "Simulated Legacy Pairing and exposed vulnerabilities via brute force attack on 6-digit passkeys",
            "Developed Bluetooth Mesh provisioning protocol with ECDH key exchange",
            "Designed reflection attack and malleable commitment attack based on research findings"
        ],
        skills: [
            "Python", "Cryptography", "AES-ECB/CCM", "ECDH", "Protocol Analysis"
        ],
        url: "https://github.com/dannyd2083/BLE-legacy-Passkey-Entry",
        category: "security",
        date: "Sep 2024 – Dec 2024",
        context: "Coursework (CMPT 789)",
        useIconDesign: true,
        icon: SiBluetooth,
        gradient: "from-blue-600 to-cyan-600"
    },
    {
        id: 7,
        title: "Penetration Testing Labs",
        description: "Completed 11 hands-on labs covering reconnaissance, exploitation, post-exploitation, MITM attacks, XSS, SQL injection, and web application security.",
        features: [
            "OSINT reconnaissance using Censys, SpiderFoot, and Nessus vulnerability scanning",
            "Metasploit exploitation of EternalBlue and BlueKeep vulnerabilities",
            "Post-exploitation: process migration, privilege escalation, credential harvesting",
            "Web application attacks: XSS, SQL injection, IDOR, SSTI, deserialization exploits"
        ],
        skills: [
            "Metasploit", "Kali Linux", "BeEF", "Social Engineering Toolkit", "Burp Suite"
        ],
        url: "https://github.com/dannyd2083/cmpt782-cybersecurity-labs",
        category: "security",
        date: "Sep 2024 – Dec 2024",
        context: "Coursework (CMPT 782)",
        useIconDesign: true,
        icon: TbShieldLock,
        gradient: "from-slate-700 to-slate-900"
    },
    {
        id: 8,
        title: "Cloud Infrastructure Deployment",
        description: "Deployed secure VPC architecture on AWS with public/private subnets, NAT Gateway, Security Groups, and IAM role-based access. Integrated EC2 with DynamoDB using least-privilege permissions.",
        features: [
            "Deployed secure VPC network with Internet Gateway, NAT Gateway, and Route Tables",
            "Launched EC2 instances and configured Node.js web server on port 8081",
            "Created IAM users, groups, and roles applying principle of least privilege",
            "Built DynamoDB table and connected to EC2 via role-based permissions"
        ],
        skills: [
            "AWS EC2", "VPC", "IAM", "DynamoDB", "Security Groups", "Node.js"
        ],
        url: "https://github.com/dannyd2083/cmpt782-cybersecurity-labs",
        category: "security",
        date: "Nov 2024",
        context: "Coursework (CMPT 782)",
        useIconDesign: true,
        icon: SiAmazonaws,
        gradient: "from-orange-500 to-yellow-500"
    },
    {
        id: 9,
        title: "Serverless API Development",
        description: "Built serverless REST API using AWS Lambda and API Gateway with Cognito-based JWT authorization for a comment system. Validated with Postman.",
        features: [
            "Built serverless REST API using AWS Lambda and API Gateway",
            "Developed Lambda function supporting both GET and POST requests",
            "Secured POST endpoint via AWS Cognito with JWT-based authorization",
            "Validated API with Postman and tested user-based access control"
        ],
        skills: [
            "AWS Lambda", "API Gateway", "Cognito", "JWT", "Postman", "Serverless"
        ],
        url: "https://github.com/dannyd2083/cmpt782-cybersecurity-labs",
        category: "security",
        date: "Nov 2024",
        context: "Coursework (CMPT 782)",
        useIconDesign: true,
        icon: SiAmazonaws,
        gradient: "from-amber-500 to-orange-600"
    },

    // 2023 Projects
    {
        id: 10,
        img: Egg,
        title: "Eggly Buddy",
        description: "Tamagotchi-inspired 2D retro game with pet care mechanics, mini-games, and shader-based visual effects. Features parallax backgrounds and JSON-based save system.",
        features: [
            "Programmed interactive pet cleaning mechanics integrated with physics",
            "Created bathroom-themed mini-game with shuffle movement and user interaction",
            "Implemented visual effects using custom shaders including parallax background",
            "Developed save/load system using nlohmann/json library"
        ],
        skills: [
            "C++", "OpenGL", "SDL", "Entity Component System (ECS)", "Shaders"
        ],
        url: "https://github.com/dannyd2083/Eggly-Buddies",
        category: "game",
        date: "Sep 2023 – Dec 2023",
        context: "Coursework (CPSC 427)"
    },
    {
        id: 11,
        img: HTN,
        title: "Swag the North",
        description: "Top 12 finalist out of 200+ projects at Hack the North. Immersive Unity-based game simulating the hackathon sponsor bay with swag collection mechanics.",
        features: [
            "Top 12 Finalist out of 200+ projects in Hack the North",
            "Spearheaded development using Unity and C# with innovative swag mechanics",
            "Implemented core gameplay: player controls, item spawning, scene management",
            "Led version control workflow and mentored team on Git best practices"
        ],
        skills: [
            "Unity", "C#", "Game Design", "Git"
        ],
        url: "https://github.com/dannyd2083/HackTheNorth",
        category: "game",
        date: "Sep 2023"
    },
    {
        id: 12,
        img: locative,
        title: "Locative Audio",
        description: "GPS-based mobile app that lets users discover Vancouver's cultural audio content at specific locations using AR Foundation for image detection.",
        features: [
            "Developed GPS-based location unlock system for audio poems",
            "Built efficient content management using XML data structure",
            "Integrated AR Foundation for image recognition on mobile devices",
            "Created interactive map interface with custom camera controls"
        ],
        skills: [
            "Unity", "C#", "AR Foundation", "GPS", "XML"
        ],
        url: null,
        category: "game",
        date: "Jan 2023 – Apr 2023"
    },

    // 2022 Projects
    {
        id: 13,
        img: search,
        title: "Insight UBC Search Engine",
        description: "Search engine that queries metadata such as past course averages and room capacity from around campus. Built with TypeScript following software engineering best practices.",
        features: [
            "Implemented query validation using EBNF grammar",
            "Built data result preparation matching query requests",
            "Created UI to web server query integration"
        ],
        skills: [
            "TypeScript", "JavaScript", "Software Engineering"
        ],
        url: null,
        category: "web",
        date: "2022",
        context: "Coursework (CPSC 310)"
    },
    {
        id: 14,
        img: pubAndFrog,
        title: "Pugs Frogs in Space",
        description: "2-player top-down shooting game made in a 2-day game jam. Features frog and pug characters using exploding bullets to kick opponents out of the arena.",
        features: [
            "Created bullet class with changeable velocity and special effects like frozen bullets",
            "Implemented shooting mechanics and physics",
            "Managed smooth scene transitions using Unity's scene manager"
        ],
        skills: [
            "Unity", "C#", "Game Jam"
        ],
        url: "https://github.com/RyanmLin/Pugs-Frogs-IN-SPACE",
        category: "game",
        date: "2022"
    },

    // 2021 Projects
    {
        id: 15,
        img: frens,
        title: "FREN",
        description: "Full-stack social networking app with user recommendation algorithm and real-time chat functionality using Redux state management.",
        features: [
            "Built user recommendation system based on similar habits and interests",
            "Implemented Redux state management and routing for seamless UX",
            "Developed responsive chat interface with custom pop-up components",
            "Created login and register pages with animations"
        ],
        skills: [
            "React", "JavaScript", "MongoDB", "Express", "Redux"
        ],
        url: "https://github.com/mattbekh/frens-app",
        category: "web",
        date: "Jun 2021 – Aug 2021"
    }
]

// Category definitions for filtering
export const categories = [
    { id: "all", label: "All Projects", count: projectList.length },
    { id: "security", label: "Security & Systems", count: projectList.filter(p => p.category === "security").length },
    { id: "web", label: "Web Development", count: projectList.filter(p => p.category === "web").length },
    { id: "game", label: "Game Development", count: projectList.filter(p => p.category === "game").length }
]
