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
          <body>
            <Navbar/>
            <main>{children}</main>
            <Footer/>
          </body>
      </html>
  )
};

export default RootLayout;