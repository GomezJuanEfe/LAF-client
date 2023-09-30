import styles from '@/styles/Navbar.module.css'
import Link from "next/link";
import { FaBars, FaAngleRight } from 'react-icons/fa';

const Nav = ({ showMenu, handleShowMenu }) => {
  return (
    <nav className={styles.navbar}>
      <div
        className={styles.navbar__toggle}
        onClick={handleShowMenu}
        onKeyDown={handleShowMenu}
        role="button"
        tabIndex={0}
      >
        <FaBars style={{ fill: 'white', fontSize: '20px' }} />
      </div>
      <div className={`${styles.navbar__overlay} ${showMenu ? styles.show : ''}`} onClick={handleShowMenu} />
      <ul className={`${styles.navbar__menu} ${showMenu ? styles.show : ''}`}>
        <li
          className={styles.navbar__back_btn}
          onClick={handleShowMenu}
          onKeyDown={handleShowMenu}
          role="menuitem"
          tabIndex={0}
        >
          <span>Regresar</span>
          <FaAngleRight />
        </li>
        <li
          className={styles.navbar__link}
          onClick={handleShowMenu}
          onKeyDown={handleShowMenu}
          role="menuitem"
          tabIndex={0}
        >
          <Link
            href="/"
            // className={({ isActive }) => (isActive ? 'active-link' : '')} CONFIGURAR ESTILOS
          >
            <h3>Home</h3>
          </Link>
        </li>
        <li
          className={styles.navbar__link}
          onClick={handleShowMenu}
          onKeyDown={handleShowMenu}
          role="menuitem"
          tabIndex={0}
        >
          <Link
            href="/blog"
            // className={({ isActive }) => (isActive ? 'active-link' : '')} CONFIGURAR ESTILOS
          >
            <h3>Blog</h3>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav;
