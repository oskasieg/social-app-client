import React from 'react';
import { IUserProfileProps } from '../../containers/Profile/types';
import styles from './UserProfile.module.scss';
import { useTranslation } from 'react-i18next';
import Interest from '../Interest/Interest';
import avatar from '../../assets/avatar.png';

const UserProfile = ({ user }: IUserProfileProps) => {
  const { t } = useTranslation();

  const getDate = (date: Date) => {
    const result1 = date.toString().substr(0, date.toString().indexOf('T'));
    const result2 = date.toString().substr(date.toString().indexOf('T') + 1, 8);

    return result1 + ' ' + result2;
  };

  return (
    <div className={styles.UserProfile}>
      <div className={styles.UserProfile__row}>Login: {user.login}</div>

      <div className={styles.UserProfile__avatar}>
        <img src={user.avatar ? user.avatar : avatar} alt='avatar'></img>
      </div>
      <div className={styles.UserProfile__stats}>
        <div className={styles.UserProfile__stat}>P: {user.numberOfPosts}</div>
        <div className={styles.UserProfile__stat}>L: {user.likes}</div>
        <div className={styles.UserProfile__stat}>F: {user.followers}</div>
      </div>
      <div className={styles.UserProfile__row}>
        {user.firstName} {user.lastName}
      </div>
      <div className={styles.UserProfile__left}>{t('Age')}:</div>
      <div className={styles.UserProfile__right}>{user.age}</div>
      <div className={styles.UserProfile__left} style={{ width: '100%' }}>
        {t('Interests')}:
      </div>
      <div className={styles.UserProfile__interests}>
        {user.interests && user.interests.map((interest: string) => <Interest key={interest} interest={interest} />)}
      </div>
      <div className={styles.UserProfile__line}></div>
      <div className={styles.UserProfile__left}>{t('Created at')}:</div>
      <div className={styles.UserProfile__right}>{user.createdAt && getDate(user.createdAt)}</div>
      <div className={styles.UserProfile__left}>{t('Last login')}:</div>
      <div className={styles.UserProfile__right}>{user.lastLogin && getDate(user.lastLogin)}</div>
    </div>
  );
};

export default UserProfile;
