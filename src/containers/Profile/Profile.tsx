import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IStoreType } from '../../store';
import styles from './Profile.module.scss';
import UserProfile from '../../components/UserProfile/UserProfile';
import { useTranslation } from 'react-i18next';

const Profile = () => {
  const { t } = useTranslation();

  const user = useSelector((state: IStoreType) => state.profileReducer.user);

  return (
    <div className={styles.Profile}>
      <div className={styles.Profile__title}>{t('Profile')}</div>
      <UserProfile user={user} />
    </div>
  );
};

export default Profile;
