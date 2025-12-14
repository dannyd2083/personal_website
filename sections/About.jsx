import React from 'react';

const About = () => {
    return (
        <div className="bg-clay-court-dark min-h-screen text-clay-cream border-b-4 border-clay-cream">
            <a id = "about" className="anchor"></a>
            <div  className=" grid lg:grid-cols-2 gap-12 items-center max-w-[1440px] mx-auto min-h-screen">
                <div className="mx-10 mt-12 lg:mt-0">
                    <img src="/profile.jpg" alt="profile" className="w-auto h-auto rounded-lg shadow-lg border-4 border-clay-dust/30"/>
                </div>
                <div>
                    <h1 className= "text-5xl text-clay-dust font-AbrilFatface mt-10 mb-10 left-0" > About Me</h1>
                    <div className="text-2xl mr-10 mb-16">
                        <p>Hi, I'm Danny. I studied <span className="text-clay-dust text-2xl font-bold">Computer Science at the University of British Columbia</span> and I'm currently pursuing a <span className="text-clay-dust text-2xl font-bold">Master's degree in Cybersecurity at Simon Fraser University</span>. I grew up in <span className="text-clay-dust text-2xl font-bold">Shenzhen, China</span>, and I'm interested in how software systems behave in the real world, especially when things go wrong.<br/><br/>
                            I enjoy working on technical problems that require <span className="text-clay-dust text-2xl font-bold">careful thinking and debugging</span>. My experience spans <span className="text-clay-dust text-2xl font-bold">cybersecurity, systems, and software development</span>, and I like getting my hands dirty with setups, experiments, and code rather than staying purely theoretical. I'm comfortable picking up new tools when needed and figuring things out by actually building and breaking things.
                            <br/><br/>
                            <span className="text-clay-dust text-2xl font-bold">Cybersecurity</span> is my current focus, particularly understanding <span className="text-clay-dust text-2xl font-bold">networks, system behavior, and how vulnerabilities are exploited and mitigated</span> in practice. Alongside that, I've always been interested in <span className="text-clay-dust text-2xl font-bold">game development and interactive systems</span>. I don't see it as a separate path, but something that naturally grows out of strong engineering fundamentals and performance-aware programming.
                            <br/><br/>
                            Outside of tech, I spend a lot of time playing <span className="text-clay-dust text-2xl font-bold">tennis</span>. I <span className="text-clay-dust text-2xl font-bold">train regularly, go to the gym</span>, and enjoy the discipline and consistency that comes with it. I also <span className="text-clay-dust text-2xl font-bold">play video games</span> and keep an eye on new titles and trends, mostly out of curiosity and long-term interest rather than chasing hype.
                            <br/><br/>
                            Thanks for stopping by. If you'd like to chat about projects, security, or anything related to software and games, feel free to reach out.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default About;