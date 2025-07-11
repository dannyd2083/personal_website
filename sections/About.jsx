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
                    <div className="text-2xl mr-10">
                        <p>Greetings, I'm Danny, a <span className="text-clay-dust text-2xl font-bold"> Computer Science graduate </span>from the <span className="text-clay-dust text-2xl font-bold"> University of British Columbia </span>, currently pursuing a <span className="text-clay-dust text-2xl font-bold">
                            Master's degree in Cybersecurity at Simon Fraser University.</span> Originally from Shenzhen, China, I'm <span className="text-clay-dust"> passionate about technology and the positive impact </span> it can have on people's lives.<br/>
                            I'm <span className="text-clay-dust"> a dedicated and detail-oriented individual</span>, with a strong drive to solve complex problems efficiently and with precision.
                            My ability <span className="text-clay-dust">  quickly learn and adapt to new technologies </span>, has helped me stay up-to-date with the latest trends and technologies in the ever-changing field of computer science.
                            <br/>
                            As I continue my journey in cybersecurity, I'm eager to deepen my understanding of this critical field and enhance my technical skills to protect systems and data.<span className="text-clay-dust"> My long-term goal is to merge my expertise in cybersecurity with my passion for game development,</span>
                            contributing to both industries by creating secure, innovative, and enjoyable experiences for players.
                            <br/>
                            In my free time, I enjoy <span className="text-clay-dust"> playing video games</span> and exploring the latest gaming trends.
                            Fitness and tennis are also passions of mine—I regularly engage in weightlifting, cardio workouts, and tennis to maintain a healthy balance between mind and body.<br/>
                            I'm  <span className="text-clay-dust">especially drawn to the gaming industry</span>, and hope to work on projects that combine my passion for gaming with my programming skills.
                            My ultimate goal is to <span className="text-clay-dust">create games that bring joy to players and make a positive impact on society.</span>  Thank you for taking the time to learn more about me. If you have any questions or would like to connect, feel free to reach out!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default About;