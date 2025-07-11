'use client'

import Link from "next/link";
import {useState} from "react";
import Image from "next/image";

const Navbar = () => {
    const [navbar, setNavbar] = useState(false);
    return (
        <nav className="w-full bg-clay-court-light sticky top-0 left-0 right-0 z-10 border-b-4 border-clay-dust">
            <div className="justify-between px-2 mx-auto lg:max-w-7xl md:items-center md:flex md:px-4">
                <div>
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        {/* LOGO */}
                        <Link href="/#home">
                            <h2 className="text-2xl text-clay-cream font-bold font-AbrilFatface">DD</h2>
                        </Link>
                        {/* HAMBURGER BUTTON FOR MOBILE */}
                        <div className="md:hidden">
                            <button
                                className="p-2 text-clay-cream rounded-md outline-none focus:border-clay-dust focus:border"
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? (
                                    <Image src={"/close.svg"}  width={30} height={30} alt={"logo"}></Image>
                                ) : (
                                    <Image src={"/Hamburger.svg"} width={30} height={30} alt={"logo"}></Image>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className={`flex-1 justify-self-center md:block md:pb-0 md:mt-0 ${
                            navbar ? 'p-12 md:p-0 block' : 'hidden'
                        }`}
                    >
                        <ul className="h-screen md:h-auto items-center justify-center md:flex">
                            <li className="text-xl text-clay-cream py-2 md:px-6 text-center border-b-2 md:border-b-0 hover:text-clay-dust hover:border-clay-dust md:hover:text-clay-dust">
                                <Link href="/#about" onClick={() => setNavbar(!navbar)}>
                                    About
                                </Link>
                            </li>
                            <li className="text-xl text-clay-cream py-2 px-6 text-center border-b-2 md:border-b-0 hover:text-clay-dust hover:border-clay-dust md:hover:text-clay-dust">
                                <Link href="/#experience" onClick={() => setNavbar(!navbar)}>
                                    Experience
                                </Link>
                            </li>
                            <li className="text-xl text-clay-cream py-2 px-6 text-center border-b-2 md:border-b-0 hover:text-clay-dust hover:border-clay-dust md:hover:text-clay-dust">
                                <Link href="/#projects" onClick={() => setNavbar(!navbar)}>
                                    Projects
                                </Link>
                            </li>
                            <li className="text-xl text-clay-cream py-2 px-6 text-center border-b-2 md:border-b-0 hover:text-clay-dust hover:border-clay-dust md:hover:text-clay-dust">
                                <Link href="/music" onClick={() => setNavbar(!navbar)}>
                                    Music
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;