import styles from '@/styles/Navbar.module.css'
import { useState } from 'react';
import Logo from "./logo"
import Nav from './nav';

const navigation = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleShowMenu = () => {
    if (window.innerWidth >= 1200) {
      return null;
    }
    return setShowMenu(!showMenu);
  };

  return (
    <header className={styles.header}>

      <div className={styles.menu__container}>

        <div className={styles.menu__image_container}>
          <Logo />
        </div>

        <Nav
          showMenu={showMenu}
          handleShowMenu={handleShowMenu}
        />

      </div>
      <div className={styles.overlay}/>

    </header>
  );
};

export default navigation;
