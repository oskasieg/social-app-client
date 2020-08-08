import React, { useState, useEffect } from 'react';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import i18n from '../../locales/i18n';
import { useSelector, useDispatch } from 'react-redux';
import { IStoreType } from '../../store';
import { useTranslation } from 'react-i18next';
import { logoutAction } from '../../containers/Profile/actions';
import { clearCookie } from '../../lib/cookie';

const Header = () => {
  const { t } = useTranslation();

  const dispatcher = useDispatch();

  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  const isLogged = useSelector((state: IStoreType) => state.profileReducer.isLogged);

  const [currentLng, setCurrentLng] = useState<string | null>('en');

  useEffect(() => {
    setCurrentLng(localStorage.getItem('lng'));
  }, []);

  useEffect(() => {
    if (currentLng === 'pl') i18n.changeLanguage('pl');
    if (currentLng === 'en') i18n.changeLanguage('en');
  }, [currentLng]);

  const changeLng = (lng: string) => {
    localStorage.setItem('lng', lng);
    setCurrentLng(lng);
  };

  const logoutProfile = () => {
    clearCookie();
    dispatcher(logoutAction());
    setMenuVisible(!menuVisible);
  };

  return (
    <header className={styles.Header} style={menuVisible ? { borderBottom: '1px solid black', boxShadow: 'none' } : {}}>
      <Link className={styles.Header__logo} to='/'>
        All or nothing
      </Link>
      <div className={styles.Header__menu} onClick={() => setMenuVisible(!menuVisible)}>
        <div className={styles.Header__bars}></div>
      </div>
      <div className={menuVisible ? styles.Header__options : `${styles.Header__hidden}`}>
        {!isLogged && (
          <>
            <Link className={styles.Header__option} to='/register' onClick={() => setMenuVisible(!menuVisible)}>
              Sign up
            </Link>
            <Link className={styles.Header__option} to='/login' onClick={() => setMenuVisible(!menuVisible)}>
              Sign in
            </Link>
          </>
        )}
        {isLogged && (
          <>
            <Link className={styles.Header__option} to='/profile' onClick={() => setMenuVisible(!menuVisible)}>
              {t('Profile')}
            </Link>
            <Link className={styles.Header__option} to='/profile/edit' onClick={() => setMenuVisible(!menuVisible)}>
              {t('Edit profile')}
            </Link>
            <Link className={styles.Header__option} to='/' onClick={logoutProfile} style={{ color: 'red' }}>
              {t('Logout')}
            </Link>
          </>
        )}

        <div className={styles.Header__lngButtons}>
          <button
            className={styles.Header__lngButton}
            style={currentLng === 'pl' ? { fontWeight: 'bold' } : {}}
            onClick={() => changeLng('pl')}
          >
            PL
          </button>
          <button
            className={styles.Header__lngButton}
            style={currentLng === 'en' ? { fontWeight: 'bold' } : {}}
            onClick={() => changeLng('en')}
          >
            EN
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
