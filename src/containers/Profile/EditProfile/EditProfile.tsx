import React, { useState, useEffect } from 'react';
import styles from './EditProfile.module.scss';
import { useTranslation } from 'react-i18next';
import { IInterest } from '../../Register/types';
import { useSelector } from 'react-redux';
import { IStoreType } from '../../../store';
import EditProfileForm from '../../../components/EditProfileForm/EditProfileForm';

const EditProfile = () => {
  const { t } = useTranslation();

  const [interests, setInterests] = useState<IInterest[]>([]);
  const user = useSelector((state: IStoreType) => state.profileReducer.user);

  useEffect(() => {
    const fetchInterests = async () => {
      const response = await fetch('http://localhost:8000/interests');
      const json = await response.json();

      setInterests(json);
    };

    fetchInterests();
  }, []);

  return (
    <div className={styles.EditProfile}>
      <div className={styles.EditProfile__title}> {t('Edit profile')}</div>
      {user && <EditProfileForm interests={interests} user={user} />}
    </div>
  );
};

export default EditProfile;
