import SocialNetworks from "./socialNetworks"
import styles from '@/styles/Footer.module.css'
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ['latin'] })

const Footer = () => {
  return (
    <footer className={`${styles.footer} ${inter.className}`}>
      <div className={styles.container}>
        <div className={styles.body}>
          <h2>Contacto:</h2>
          <p>administrador@laf.com.co</p>
          <p>
            <a href="https://maps.app.goo.gl/rYqXk1p1Bnuq4eZ67">
              Calle 49B # 74-31
            </a>
          </p>
          <p>Medellin, Antioquia - Colombia</p>
        </div>
        <SocialNetworks />
        <p>© 2020 L.A.F. Todos los derechos reservados</p>
      </div>
    </footer>
  )
}

export default Footer