import Navbar from './global/Navbar'
import Footer from './global/Footer'
 
export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}