import React, { useEffect, useState } from 'react';
import styles from './Register.module.scss';
import UserForm from '../../components/UserForm/UserForm';
import { IInterest } from './types';
import { useTranslation } from 'react-i18next';

const Register = () => {
  const [interests, setInterests] = useState<IInterest[]>([]);

  const { t } = useTranslation();

  useEffect(() => {
    const fetchInterests = async () => {
      const response = await fetch('https://oskasieg-social-app.herokuapp.com/interests');
      const json = await response.json();

      setInterests(json);
    };

    fetchInterests();
  }, []);

  return (
    <div className={styles.Register}>
      <div className={styles.Register__title}>{t('Register form')}</div>
      <UserForm interests={interests} type='register' />
    </div>
  );
};

export default Register;
