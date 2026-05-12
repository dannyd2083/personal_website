import '../styles/globals.css'
import Navbar from "@/components/Navbar";
import Footer from "@/sections/Footer";

export const metadata = {
    title: "Danny's Portfolio",
    description: "Hi, I'm Danny — software developer. Welcome to my personal portfolio.",
    openGraph: {
        title: "Danny's Portfolio",
        description: "Hi, I'm Danny — software developer. Welcome to my personal portfolio.",
        url: 'https://www.dannydeng.dev',
        siteName: "Danny's Portfolio",
        images: [
            {
                url: 'https://www.dannydeng.dev/personal_website.png',
                width: 1200,
                height: 630,
            }
        ],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: "Danny's Portfolio",
        description: "Hi, I'm Danny — software developer. Welcome to my personal portfolio.",
        images: ['https://www.dannydeng.dev/personal_website.png'],
    },
};

const RootLayout = ({children}) => {
    return (
        <html lang="en">
        <body className="bg-clay-court-dark">
        <div className="min-h-screen">
            <Navbar/>
            <main>{children}</main>
            <Footer/>
        </div>
        </body>
        </html>
    )
};

export default RootLayout;