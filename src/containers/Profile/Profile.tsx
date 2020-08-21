import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IStoreType } from '../../store';
import styles from './Profile.module.scss';
import UserProfile from '../../components/UserProfile/UserProfile';
import { useTranslation } from 'react-i18next';
import { getProfileAction } from './actions';
import { getCookie } from '../../lib/cookie';
import { forwardTo } from '../../lib/history';

const Profile = () => {
  const { t } = useTranslation();

  const dispatcher = useDispatch();

  const user = useSelector((state: IStoreType) => state.profileReducer.user);

  const isLogged = useSelector((state: IStoreType) => state.profileReducer.isLogged);

  useEffect(() => {
    if (!isLogged) forwardTo('/');
  }, [isLogged]);

  useEffect(() => {
    const cookieExist = getCookie();

    if (cookieExist) {
      const cookie = JSON.parse(cookieExist);

      dispatcher(getProfileAction(cookie.login, cookie.token));
    }
  }, [dispatcher]);

  return (
    <div className={styles.Profile}>
      <div className={styles.Profile__title}>{t('Profile')}</div>
      <UserProfile user={user} />
    </div>
  );
};

export default Profile;
