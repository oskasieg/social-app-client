import React, { useState } from 'react';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';

const Header = () => {
  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  return (
    <header className={styles.Header} style={menuVisible ? { borderBottom: '1px solid black', boxShadow: 'none' } : {}}>
      <div className={styles.Header__logo}>All or nothing</div>
      <div className={styles.Header__menu} onClick={() => setMenuVisible(!menuVisible)}>
        <div className={styles.Header__bars}></div>
      </div>
      <div className={menuVisible ? styles.Header__options : `${styles.Header__hidden}`}>
        <Link className={styles.Header__option} to='/register' onClick={() => setMenuVisible(!menuVisible)}>
          Sign up
        </Link>
        <Link className={styles.Header__option} to='/login' onClick={() => setMenuVisible(!menuVisible)}>
          Sign in
        </Link>
      </div>
    </header>
  );
};

export default Header;
