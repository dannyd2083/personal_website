import React from 'react';
import Image from "next/image";

const About = () => {
    return (
        <div>
            <a id = "about" className="anchor"></a>
            <div  className=" grid lg:grid-cols-2 gap-12 items-center max-w-[1440px] mx-auto min-h-screen">
                <div className="mx-10 mt-12 lg:mt-0">
                    <img src="/profile.jpg" alt="profile" className="w-auto h-auto"/>
                </div>
                <div>
                <h1 className= "text-5xl text-regal-yellow font-AbrilFatface mt-10 mb-10 left-0" > About Me</h1>
                    <div className="text-2xl mr-10">
                        <p>Greetings, I'm Danny, a recent <span className="text-regal-yellow text-2xl font-bold"> Computer Science graduate </span>from the <span className="text-regal-yellow text-2xl font-bold"> University of British Columbia in Vancouver </span>.
                            Originally from Shenzhen, China, I'm <span className="text-regal-yellow"> passionate about technology and the positive impact </span> it can have on people's lives.<br/>
                            I'm <span className="text-regal-yellow"> a dedicated and detail-oriented individual</span> who takes great pride in my work and strives to solve complex problems with efficiency and precision.
                            My strengths include<span className="text-regal-yellow">  my ability to learn and adapt quickly</span>, which has helped me stay up-to-date with the latest trends and technologies in the ever-changing field of computer science.
                            <br/>
                            This September, I am excited to further my journey by pursuing a <span className="text-regal-yellow text-2xl font-bold"> Master's degree in Cybersecurity at Simon Fraser University</span>. I am eager to deepen my understanding and enhance my skills in this vital area of technology.
                            <br/>
                            In my free time, I enjoy <span className="text-regal-yellow"> playing video games</span> and exploring the latest gaming trends.
                            I'm also passionate about fitness and regularly engage in a range of physical activities, from weightlifting to cardio workouts.
                            Looking to the future, my ultimate goal is to become a reliable developer and make a meaningful contribution to the industry.
                            I'm particularly <span className="text-regal-yellow">interested in the gaming industry</span>, and I hope to work on projects that allow me to blend my passion for gaming with my programming skills.
                            Ultimately, I want to <span className="text-regal-yellow">create video games that bring joy and happiness</span> to people, and make a positive impact on society.
                            Thanks for taking the time to learn a little bit more about me.
                            If you have any questions or would like to connect, please don't hesitate to reach out.</p>
                    </div>

                </div>
            </div>
        </div>
    );
};
export default About;