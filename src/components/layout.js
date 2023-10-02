import delve from 'dlv';
import Navbar from './global/Navbar'
import Footer from './global/Footer'
import Seo from './seo';
 
export default function Layout({ children, pageData }) {
  return (
    <>
      <Seo seo={delve(pageData, 'attributes.seo')} />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}