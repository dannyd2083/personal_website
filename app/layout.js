import '../styles/globals.css'
import Navbar from "@/components/Navbar";
import Footer from "@/sections/Footer";

export const metadata = {
    title: 'Danny website',
    description: 'Personal portfolio',
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