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
                        <p>
                            Hi, I'm Danny. I grew up in{" "}
                            <span className="text-clay-dust text-2xl font-bold">Shenzhen, China</span>
                            , and came to Canada during high school. I studied{" "}
                            <span className="text-clay-dust text-2xl font-bold">
    Computer Science at the University of British Columbia
  </span>{" "}
                            and recently finished my last semester in the{" "}
                            <span className="text-clay-dust text-2xl font-bold">
    Master's program in Cybersecurity at Simon Fraser University
  </span>
                            .
                            <br />
                            <br />
                            I like working on technical problems that involve{" "}
                            <span className="text-clay-dust text-2xl font-bold">
    debugging, testing, and figuring things out
  </span>{" "}
                            by actually building them. My experience is mostly around{" "}
                            <span className="text-clay-dust text-2xl font-bold">
    software development, cybersecurity, systems, and web projects
  </span>
                            . I enjoy picking up new tools when I need them, and I usually learn best by
                            trying things out rather than only reading about them.
                            <br />
                            <br />
                            <span className="text-clay-dust text-2xl font-bold">Cybersecurity</span> has
                            been my recent focus, but I’m also interested in building practical software
                            that people can actually use. I like projects where I can{" "}
                            <span className="text-clay-dust text-2xl font-bold">
    try things, debug weird problems, and slowly figure out how everything fits
    together
  </span>
                            . I’m also into{" "}
                            <span className="text-clay-dust text-2xl font-bold">
    game development and interactive systems
  </span>
                            , partly because I enjoy games, and partly because I like seeing how gameplay
                            systems and interactions are actually built.
                            <br />
                            <br />
                            Outside of tech, I spend a lot of time playing{" "}
                            <span className="text-clay-dust text-2xl font-bold">tennis</span>, going to
                            the{" "}
                            <span className="text-clay-dust text-2xl font-bold">gym</span>, and recently
                            started learning{" "}
                            <span className="text-clay-dust text-2xl font-bold">
    Brazilian jiu-jitsu
  </span>
                            . I also enjoy{" "}
                            <span className="text-clay-dust text-2xl font-bold">video games</span>, not
                            only as a hobby, but because I’m curious about how they are designed and
                            built.
                            <br />
                            <br />
                            Thanks for stopping by. Feel free to reach out if you want to chat about{" "}
                            <span className="text-clay-dust text-2xl font-bold">
    software, security, games, or projects
  </span>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default About;