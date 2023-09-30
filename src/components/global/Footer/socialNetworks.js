import { BsFacebook, BsTwitter, BsInstagram, BsYoutube } from "react-icons/bs";
import styles from '@/styles/Footer.module.css'

const socialNetworks = () => {
  return (
    <div className={styles.social_networks}>
      <a href="#">
        <BsFacebook />
      </a>
      <a href="#">
        <BsInstagram />
      </a>
      <a href="#">
        <BsTwitter />
      </a>
      <a href="#">
        <BsYoutube />
      </a>
    </div>
  )
}

export default socialNetworks
